CREATE FUNCTION [dbo].[MIMissISR]()
RETURNS @MIMissISR TABLE(
Incident_Date date,
Miss_Date date,
ISM_Nbr Varchar(100),
Reportable Varchar(3),
Division Varchar(500),
ITD_Division_Actual Varchar(1000),
ITMiss_Division_Actual Varchar(500),
Description Varchar(4000),
Short_Description Varchar(4000),
Start_Date Date,
Start_Time Varchar(8),
Start_Time_Decimal Decimal(24, 6),
End_Date Date,
End_Time Varchar(8),
End_Time_Decimal Decimal(24, 6),
Duration Varchar(30),
Duration_Decimal Decimal(24, 6),
Input_Type Varchar(50),
Sent_Month Varchar(19),
SLA_Time Time,
Sent_Year int,
Sent_Time Time,
Miss_Duration Time,
Src_Client_Name Varchar(200),
Src_Comments Varchar(500),
Time_Zone Varchar(19),
DeliverableNameL2 Varchar(50),
DeliverableNameL3 Varchar(50),
DeliverableTypeL1 Varchar(50),
Alt_Incident_ID Varchar(50),
Secondary_Incidents Varchar(500),
File_Name Varchar(150),
SLA_Miss_Count Varchar(25),
Related_Incidents Varchar(500),
Root_Cause Varchar(500),
RootCause_Owner_1 Varchar(100),
RootCause_Owner_2 Varchar(100),
RootCause_Category Varchar(100),
RootCause_Owner_Category Varchar(500),
RootCause_Owner_1_Category Varchar(500),
RootCause_Owner_2_Category Varchar(500),
RootCause_Owner_1_2 Varchar(500),
Res_Theme_Initial Varchar(500),
Problem_App Varchar(1000),
Impacted_App Varchar(1000),
PXO_App_Name_L3 Varchar(200),
PXO_App_Name_L2 Varchar(200),
PXO_App_Name_L1 Varchar(200),
Product_Cat1 Varchar(200),
Crown_Jewel Varchar(200),
PXO_Client_Name Varchar(200),
[Remediation/Impact] Varchar(4000),
MI_Origin Varchar(18),
Year Varchar(4),
Month Varchar(3),
MI_Update Datetime,
Miss_SLA_Update Datetime,
ISR_Update Datetime,
Incident_Classification Varchar(19),
Miss_Perc_Incident FLOAT,
Miss_Perc_Detail FLOAT,
Operations_Groups VARCHAR(100)
)
AS
BEGIN
DECLARE
@CurrentDate date = CAST(CONVERT(VARCHAR(10), GETDATE(), 101) AS DATE),
@CurrentTime time = CAST(CONVERT(VARCHAR(8), GETDATE(), 108) AS TIME(0)),
@WeekDay Varchar(20) = DATENAME(DW,GETDATE()),
@StartDate Datetime,
@CurrDate Datetime,
@HolidayDate Date,
@HolidayDay Varchar(20)

SELECT @HolidayDate = Holiday_Date FROM NavQualityNew.dbo.Holiday
WHERE Country = 'United States' and Holiday_Date = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,GETDATE()),-1),101) AS DATE)

IF @HolidayDate IS NOT NULL OR @HolidayDate <> ''
BEGIN
   SET @CurrentDate = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,@HolidayDate),-1),101) AS DATE)
END

--SET @HolidayDay = DATENAME(DW,@HolidayDate)
   SET @WeekDay = DATENAME(DW,@CurrentDate)

IF @WeekDay = 'Monday' AND (DATEPART(HH,@CurrentTime) < 10 OR DATEPART(HH,@CurrentTime) >= 10)
BEGIN
   SET @StartDate = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,@CurrentDate),-3),101)+ ' ' +'06:00:00.000' AS DATETIME)
END
ELSE IF @WeekDay = 'Sunday' AND (DATEPART(HH,@CurrentTime) < 10 OR DATEPART(HH,@CurrentTime) >= 10)
BEGIN
   SET @StartDate = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,@CurrentDate),-2),101)+ ' ' +'06:00:00.000' AS DATETIME)
END
ELSE IF @WeekDay = 'Saturday' AND (DATEPART(HH,@CurrentTime) < 10 OR DATEPART(HH,@CurrentTime) >= 10)
BEGIN
   SET @StartDate = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,@CurrentDate),-1),101)+ ' ' +'06:00:00.000' AS DATETIME)
END
ELSE IF  DATEPART(HH,@CurrentTime) < 10
BEGIN
   SET @StartDate = CAST(CONVERT(VARCHAR(10),DATEADD(DD,DATEDIFF(DY,0,@CurrentDate),-1),101)+ ' ' +'06:00:00.000' AS DATETIME)
END
ELSE IF DATEPART(HH,@CurrentTime) >= 10
BEGIN
   SET @StartDate = CAST(CAST(@CurrentDate AS VARCHAR(10)) + ' ' +'06:00:00.000' AS DATETIME)
END

SET @CurrDate = CAST(GETDATE() AS DATETIME)

INSERT INTO @MIMissISR

SELECT Incident_Date,
Miss_Date,
ISM_Nbr,
Reportable,
Division,
ITD_Division_Actual,
ITMiss_Division_Actual,
Description,
Short_Description,
Start_Date,
Start_Time,
Start_Time_Decimal,
End_Date,
End_Time,
End_Time_Decimal,
Duration,
Duration_Decimal,
Input_Type,
Sent_Month,
SLA_Time,
Sent_Year,
Sent_Time,
Miss_Duration,
Src_Client_Name,
Src_Comments,
Time_Zone,
DeliverableNameL2,
DeliverableNameL3,
DeliverableTypeL1,
Alt_Incident_ID,
Secondary_Incidents,
File_Name,
SLA_Miss_Count,
Related_Incidents,
Root_Cause,
RootCause_Owner_1,
RootCause_Owner_2,
RootCause_Category,
RootCause_Owner_Category,
RootCause_Owner_1_Category,
RootCause_Owner_2_Category,
RootCause_Owner_1_2,
Res_Theme_Initial,
Problem_App,
Impacted_App,
case when PXO_App_Name_L3 IS NULL OR PXO_App_Name_L3 = '' then t.Problem_App else PXO_App_Name_L3 End as PXO_App_Name_L3,
case when PXO_App_Name_L2 IS NULL OR PXO_App_Name_L2 = '' then t.Problem_App else PXO_App_Name_L2 end as PXO_App_Name_L2,
case when PXO_App_Name_L1 IS NULL OR PXO_App_Name_L1 = '' then t.Problem_App else PXO_App_Name_L1 end as PXO_App_Name_L1,
Product_Cat1,
Crown_Jewel,
PXO_Client_Name,
[Remediation/Impact],
MI_Origin,
Year,
Month,
MI_Update,
Miss_SLA_Update,
ISR_Update,
Incident_Classification,
Miss_Perc_Incident,
Miss_Perc_Detail,
Operations_Groups
FROM
(

   SELECT Incident_Date,
   Miss_Date,
   ISM_Nbr,
   Reportable,
   Division,
   ITD_Division_Actual,
   ITMiss_Division_Actual,
   Description,
   Short_Description,
   Start_Date,
   Start_Time,
   Start_Time_Decimal,
   End_Date,
   End_Time,
   End_Time_Decimal,
   Duration,
   Duration_Decimal,
   Input_Type,
   Sent_Month,
   SLA_Time,
   Sent_Year,
   Sent_Time,
   Miss_Duration,
   Src_Client_Name,
   Src_Comments,
   Time_Zone,
   DeliverableNameL2,
   DeliverableNameL3,
   DeliverableTypeL1,
   Alt_Incident_ID,
   Secondary_Incidents,
   File_Name,
   SLA_Miss_Count,
   Related_Incidents,
   Root_Cause,
   RootCause_Owner_1,
   RootCause_Owner_2,
   RootCause_Category,
   RootCause_Owner_Category,
   RootCause_Owner_1_Category,
   RootCause_Owner_2_Category,
   RootCause_Owner_1_2,
   Res_Theme_Initial,
   Problem_App,
   Impacted_App,
   PXO_Client_Name,
   [Remediation/Impact],
   MI_Origin,
   Year,
   Month,
   MI_Update,
   Miss_SLA_Update,
   ISR_Update,
   Incident_Classification,
   Miss_Perc_Incident,
   Miss_Perc_Detail,
   Operations_Groups
   FROM
   (
      SELECT CASE WHEN miss.Incident_Date IS NULL THEN mi.Incident_Date ELSE miss.Incident_Date END as Incident_Date,
      miss.Miss_Date,
      CASE WHEN miss.ISM_Nbr IS NULL THEN mi.ISM_Nbr ELSE miss.ISM_Nbr END as ISM_Nbr,
      CASE WHEN miss.Reportable IS NULL THEN mi.Reportable ELSE miss.Reportable END as Reportable,
      CASE WHEN mi.Desc_Incident IS NULL THEN miss.Description ELSE mi.Desc_Incident END as Description,
      CASE WHEN mi.Source IS NULL THEN miss.Source ELSE mi.Source END as Short_Description,
      miss.Alt_Incident_ID,
      miss.DeliverableNameL2,
      miss.DeliverableNameL3,
      miss.DeliverableTypeL1,
      miss.File_Name,
      miss.Input_Type,
      miss.Miss_Duration,
      CASE WHEN cm.PXO_Client_Name IS NULL THEN 'No SLA Miss' ELSE cm.PXO_Client_Name END as PXO_Client_Name ,
      miss.SLA_Miss_Count,
      miss.SLA_Time,
      miss.Sent_Month,
      miss.Sent_Time,
      miss.Sent_Year,
      CASE WHEN miss.Src_Client_Name IS NULL THEN 'No SLA Miss' ELSE miss.Src_Client_Name END as Src_Client_Name,
      miss.Src_Comments,
      miss.Time_Zone,
      mi.Start_Date,
      CASE WHEN (CONVERT(VARCHAR(7),Cast(mi.Start_Time as TIME(0)),100)) IS NULL THEN '' ELSE CONVERT(VARCHAR(7),Cast(mi.Start_Time as TIME(0)),100) END as Start_Time,
      CAST(LEFT(CAST(CONVERT(time(0), cast(mi.Start_Time as datetime), 108) AS VARCHAR(8)),2) * 3600
      + RIGHT(LEFT(CAST(CONVERT(time(0), cast(mi.Start_Time as datetime), 108) AS VARCHAR(8)),5),2) * 60
      + RIGHT(CAST(CONVERT(time(0), cast(mi.Start_Time as datetime), 108) AS VARCHAR(8)),2) as decimal)/86400 AS Start_Time_Decimal,mi.End_Date,
      CASE WHEN (CONVERT(VARCHAR(7),Cast(mi.End_Time as TIME(0)),100)) IS NULL THEN '' ELSE CONVERT(VARCHAR(7),Cast(mi.End_Time as TIME(0)),100) END AS End_Time ,
      CAST(LEFT(CAST(CONVERT(time(0), cast(mi.End_Time as datetime), 108) AS VARCHAR(8)),2) * 3600
      + RIGHT(LEFT(CAST(CONVERT(time(0), cast(mi.End_Time as datetime), 108) AS VARCHAR(8)),5),2) * 60
      + RIGHT(CAST(CONVERT(time(0), cast(mi.End_Time as datetime), 108) AS VARCHAR(8)),2) as decimal)/86400 AS End_Time_Decimal,
      CASE WHEN mi.Duration IS NULL THEN '' ELSE mi.Duration END AS Duration,
      CASE WHEN ISDATE(mi.Duration) =0 THEN CAST(LEFT(Duration,2) * 3600 +
      RIGHT(LEFT(Duration,5),2) * 60 + RIGHT(Duration,2) as decimal)/86400
      ELSE CAST(LEFT(cast(mi.Duration as time),2) * 3600 +
      RIGHT(LEFT(cast(mi.Duration as time),5),2) * 60 + RIGHT(cast(mi.Duration as time),2) as decimal)/86400 END as Duration_Decimal,
      mi.Related_Incidents,
      (CASE WHEN mi.ISM_Nbr IS NULL THEN 'Does Not Apply' ELSE (CASE WHEN mi.[Remediation/Impact] IS NULL OR mi.[Remediation/Impact]= '' THEN 'TBD' ELSE mi.[Remediation/Impact] END)END) as [Remediation/Impact],
      mi.Res_Theme_Initial,
      (CASE WHEN mi.ISM_Nbr IS NULL THEN 'Does Not Apply' ELSE (CASE WHEN mi.Root_Cause IS NULL THEN 'TBD' ELSE mi.Root_Cause END)END) as Root_Cause,
      CASE WHEN mi.RootCause_Owner_1 IS NULL THEN '' ELSE mi.RootCause_Owner_1 END as RootCause_Owner_1,
      CASE WHEN mi.RootCause_Owner_2 IS NULL THEN '' ELSE mi.RootCause_Owner_2 END as RootCause_Owner_2,
      CASE WHEN mi.RootCause_Category IS NULL THEN '' ELSE mi.RootCause_Category END as RootCause_Category,
      CASE WHEN mi.RootCause_Owner_1+'-'+mi.RootCause_Owner_2+'-'+mi.RootCause_Category IS NULL THEN '' ELSE mi.RootCause_Owner_1+'-'+mi.RootCause_Owner_2+'-'+mi.RootCause_Category END as RootCause_Owner_Category ,
      CASE WHEN mi.RootCause_Owner_1+'-'+mi.RootCause_Category IS NULL THEN '' ELSE mi.RootCause_Owner_1+'-'+mi.RootCause_Category END as RootCause_Owner_1_Category,
      CASE WHEN mi.RootCause_Owner_2+'-'+ mi.RootCause_Category IS NULL THEN '' ELSE mi.RootCause_Owner_2+'-'+ mi.RootCause_Category END as RootCause_Owner_2_Category,
      CASE WHEN mi.RootCause_Owner_1+'-'+mi.RootCause_Owner_2 IS NULL THEN '' ELSE mi.RootCause_Owner_1+'-'+mi.RootCause_Owner_2 END as RootCause_Owner_1_2,
      mi.Secondary_Incidents,
      SUBSTRING(CAST(CASE WHEN miss.Incident_Date IS NULL THEN mi.Incident_Date ELSE miss.Incident_Date END AS VARCHAR(10)),1,4) AS Year,
      CONVERT(VARCHAR(3),CASE WHEN miss.Incident_Date IS NULL THEN mi.Incident_Date ELSE miss.Incident_Date END,0) as Month,
      CASE WHEN der.Division_Der IS NULL THEN miss.Division ELSE der.Division_Der END AS Division,
      CASE WHEN mi.Division IS NOT NULL THEN mi.Division ELSE '' END AS ITD_Division_Actual,
      CASE WHEN miss.Division IS NOT NULL THEN miss.Division ELSE '' END AS ITMiss_Division_Actual,
      CASE WHEN (adm.Problem_App IS NOT NULL AND adm.Problem_App <> '') THEN adm.Problem_App
      ELSE(CASE WHEN (miss.Problem_App IS NOT NULL AND miss.Problem_App <> '') THEN miss.Problem_App
      ELSE(CASE WHEN (isrrt.Sec_CI_Name IS NOT NULL AND isrrt.Sec_CI_Name <> '') THEN isrrt.SEC_CI_Name
      ELSE(CASE WHEN (isrrt.Pri_CI_Name IS NOT NULL AND isrrt.Pri_CI_Name <> '') THEN isrrt.Pri_CI_Name
      ELSE(CASE WHEN isrrt.Pri_CI_Name IS NULL THEN 'TBD' END)END)END)END)END as Problem_App,adm.Impacted_App,
      mi.pxo_upd_date as MI_Update,miss.pxo_upd_date as Miss_SLA_Update,NULL as ISR_Update,
      CASE WHEN mi.ISM_Nbr IS NOT NULL AND miss.ISM_Nbr IS NOT NULL  THEN 'ITD & IT Miss Both'
      ELSE(CASE WHEN miss.ISM_Nbr IS NULL THEN 'ITD ONLY'
      ELSE(CASE WHEN mi.ISM_Nbr IS NULL THEN 'IT Miss Only' END)END)END as MI_Origin,
      CASE WHEN miss.ISM_Nbr IS NULL THEN 'Data Not Applicable'
      ELSE miss.Incident_Classification END as Incident_Classification,miss.Miss_Perc_Incident,miss.Miss_Perc_Detail,mi.Operations_Groups
      FROM dbo.ITD_ClientSLAMiss miss
      FULL OUTER JOIN (SELECT * FROM dbo.Major_Incidents)mi ON mi.ISM_Nbr = miss.ISM_Nbr and mi.Incident_Date = miss.Incident_Date
      LEFT JOIN (SELECT ISM_Nbr,Incident_Date,Division_Der FROM dbo.ITD_Derived)der ON mi.ISM_Nbr = der.ISM_Nbr and mi.Incident_Date = der.Incident_Date
      LEFT JOIN (SELECT ISM_Nbr,Incident_Date,Problem_App,Impacted_App FROM dbo.ITD_ADM)adm ON mi.ISM_Nbr = adm.ISM_Nbr and mi.Incident_Date = adm.Incident_Date
      LEFT JOIN (SELECT ISM_Nbr,Incident_Date,SEC_CI_Name FROM dbo.ITD_ISR)isr ON mi.ISM_Nbr = isr.ISM_Nbr and mi.Incident_Date = isr.Incident_Date
      LEFT JOIN (SELECT distinct Src_Client_Name,PXO_Client_Name FROM NavQualityNew.dbo.ClientMaster Where Source = 'IT-Miss' and DE_Table_Name = '[ITD].[DBO].[Reference_ClientName]')cm ON miss.Src_Client_Name = cm.Src_Client_Name
      LEFT JOIN (SELECT Ticket_Number,Create_Date_EST,Sec_CI_Name,Pri_CI_Name FROM dbo.ITD_ISR_RealTime)isrrt ON mi.ISM_Nbr = isrrt.Ticket_Number and mi.Incident_Date = CAST(isrrt.Create_Date_EST AS DATE)
   ) t2
   WHERE t2.Incident_Date > '2015-01-01'

) t

LEFT JOIN
(
   SELECT distinct ITD_Prob_App,PXO_App_Name_L3,PXO_App_Name_L2,PXO_App_Name_L1,Product_Cat1,Crown_Jewel
   FROM PXORefDataDB.dbo.PXO_ApplicationMaster
) appmstr
ON RTRIM(LTRIM(t.Problem_App)) = RTRIM(LTRIM(appmstr.ITD_Prob_App))

UNION ALL

SELECT Incident_Date,Miss_Date,ISM_Nbr,Reportable,Division,ITD_Division_Actual,ITMiss_Division_Actual,Description,Short_Description,StartDate,StartTime,
Start_Time_Decimal,EndDate,EndTime,End_Time_Decimal,Duration,Duration_Decimal,
Input_Type,Sent_Month,SLA_Time,Sent_Year,Sent_Time,Miss_Duration,Src_Client_Name,Src_Comments,Time_Zone,
DeliverableNameL2,DeliverableNameL3,DeliverableTypeL1,Alt_Incident_ID,Secondary_Incidents,File_Name,SLA_Miss_Count,Related_Incidents,
Root_Cause,RootCause_Owner_1,RootCause_Owner_2,RootCause_Category,RootCause_Owner_Category,RootCause_Owner_1_Category,RootCause_Owner_2_Category,RootCause_Owner_1_2,
Res_Theme_Initial,Problem_App,Impacted_App,PXO_App_Name_L3,PXO_App_Name_L2,PXO_App_Name_L1,Product_Cat1,Crown_Jewel,
PXO_Client_Name,[Remediation/Impact],MI_Origin,Year,Month,MI_Update,Miss_SLA_Update,ISR_Update,Incident_Classification,Miss_Perc_Incident,Miss_Perc_Detail,Operations_Groups
FROM
(
   SELECT CONVERT(DATE,Create_Date_EST,101) as Incident_Date,NULL as Miss_Date,Ticket_Number as ISM_Nbr,'P' as Reportable,CONVERT(VARCHAR, Details) as Description,CONVERT(VARCHAR,Details_Limited )as Short_Description,
   CONVERT(DATE,Create_Date_EST,101) as StartDate,CASE WHEN (CONVERT(VARCHAR(7),Cast(Create_Date_EST as TIME(0)),100)) IS NULL THEN '' ELSE CONVERT(VARCHAR(7),Cast(Create_Date_EST as TIME(0)),100) END as StartTime,
   CAST(LEFT(CAST(CONVERT(time(0), cast(Create_Date_EST as datetime), 108) AS VARCHAR(8)),2) * 3600
   + RIGHT(LEFT(CAST(CONVERT(time(0), cast(Create_Date_EST as datetime), 108) AS VARCHAR(8)),5),2) * 60
   + RIGHT(CAST(CONVERT(time(0), cast(Create_Date_EST as datetime), 108) AS VARCHAR(8)),2) as decimal)/86400
   AS Start_Time_Decimal,CONVERT(DATE,Actual_Finish_EST,101) as EndDate,
   CASE WHEN (CONVERT(VARCHAR(7),Cast(Actual_Finish_EST as TIME(0)),100)) IS NULL THEN '' ELSE CONVERT(VARCHAR(7),Cast(Actual_Finish_EST as TIME(0)),100) END as EndTime,
   CAST(LEFT(CAST(CONVERT(time(0), cast(Actual_Finish_EST as datetime), 108) AS VARCHAR(8)),2) * 3600
   + RIGHT(LEFT(CAST(CONVERT(time(0), cast(Actual_Finish_EST as datetime), 108) AS VARCHAR(8)),5),2) * 60
   + RIGHT(CAST(CONVERT(time(0), cast(Actual_Finish_EST as datetime), 108) AS VARCHAR(8)),2) as decimal)/86400
   AS End_Time_Decimal,
   CASE WHEN (CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108)) IS NULL THEN '' ELSE CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108) END as Duration,
   CASE WHEN ISDATE(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108)) =0 THEN CAST(LEFT(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108),2) * 3600 +
   RIGHT(LEFT(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108),5),2) * 60 + RIGHT(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108),2) as decimal)/86400
   ELSE CAST(LEFT(cast(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108) as time),2) * 3600 +
   RIGHT(LEFT(cast(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108) as time),5),2) * 60 + RIGHT(cast(CONVERT(VARCHAR,Actual_Finish_EST - Create_Date_EST,108) as time),2) as decimal)/86400 END as Duration_Decimal,
   RelatedGlobal_TicketID as Secondary_Incidents,'Data Not Applicable' as Alt_Incident_ID,'Data Not Applicable' as Input_Type,NULL as Miss_Duration,
   'Data Not Applicable' as DeliverableNameL2,'Data Not Applicable' as DeliverableNameL3,'Data Not Applicable' as DeliverableTypeL1,'Data Not Applicable' as File_Name,
   'Data Not Applicable' as PXO_Client_Name,'Data Not Applicable' as SLA_Miss_Count,'Data Not Applicable' as Sent_Month,NULL as SLA_Time,NULL as Sent_Time,NULL as Sent_Year,
   'Data Not Applicable' as Src_Client_Name,'Data Not Applicable' as Src_Comments,'Data Not Applicable' as Time_Zone,'Data Not Applicable' as Related_Incidents,
   'Data Not Applicable' as [Remediation/Impact],'Data Not Applicable' as Res_Theme_Initial,'Data Not Applicable' as Root_Cause,
   'Data Not Applicable' as RootCause_Owner_1,'Data Not Applicable' as RootCause_Owner_2,'Data Not Applicable' as RootCause_Category,'Data Not Applicable' as RootCause_Owner_Category,
   'Data Not Applicable' as RootCause_Owner_1_Category,'Data Not Applicable' as RootCause_Owner_2_Category,'Data Not Applicable' as RootCause_Owner_1_2,
   'NA' as Division,'' as ITD_Division_Actual,'' as ITMiss_Division_Actual,'' as PXO_App_Name_L3,'' as PXO_App_Name_L2,'' as PXO_App_Name_L1,'' as Product_Cat1,'' as Crown_Jewel,
   'ISR ONLY' as MI_Origin,NULL as MI_Update,NULL as Miss_SLA_Update,pxo_upd_date as ISR_Update,'Data Not Applicable' as Incident_Classification,NULL as Miss_Perc_Incident,NULL as Miss_Perc_Detail,
   CASE WHEN Sec_CI_Name IS NOT NULL THEN SEC_CI_Name
   ELSE(CASE WHEN Pri_CI_Name IS NOT NULL THEN Pri_CI_Name
   ELSE(CASE WHEN Pri_CI_Name IS NULL THEN 'TBD' END)END)END as Problem_App,'Data Not Applicable' as Impacted_App,
   SUBSTRING(CAST(Create_Date_EST AS VARCHAR(12)),8,4) AS Year,CONVERT(VARCHAR(3),Create_Date_EST ,0) as Month,'Data Not Applicable' as Operations_Groups
   FROM [ITD].[dbo].[ITD_ISR_RealTime] isrt
   WHERE Create_Date_EST between @StartDate and @CurrDate
   and isrt.Ticket_Number NOT IN
   (
      SELECT ISM_Nbr FROM
      (
         SELECT CASE WHEN miss.Incident_Date IS NULL THEN mi.Incident_Date ELSE miss.Incident_Date END as Incident_Date,
         CASE WHEN miss.ISM_Nbr IS NULL THEN mi.ISM_Nbr ELSE miss.ISM_Nbr END as ISM_Nbr
         FROM dbo.ITD_ClientSLAMiss miss
         FULL OUTER JOIN (SELECT * FROM dbo.Major_Incidents)mi
         ON mi.ISM_Nbr = miss.ISM_Nbr and mi.Incident_Date = miss.Incident_Date
         LEFT JOIN (SELECT ISM_Nbr,Incident_Date,Division_Der FROM dbo.ITD_Derived)der
         ON mi.ISM_Nbr = der.ISM_Nbr and mi.Incident_Date = der.Incident_Date
         LEFT JOIN (SELECT ISM_Nbr,Incident_Date,Problem_App,Impacted_App FROM dbo.ITD_ADM)adm
         ON mi.ISM_Nbr = adm.ISM_Nbr and mi.Incident_Date = adm.Incident_Date
         LEFT JOIN (SELECT ISM_Nbr,Incident_Date,SEC_CI_Name FROM dbo.ITD_ISR)isr
         ON mi.ISM_Nbr = isr.ISM_Nbr and mi.Incident_Date = isr.Incident_Date
         LEFT JOIN (SELECT Ticket_Number,Create_Date_EST,Sec_CI_Name,Pri_CI_Name FROM dbo.ITD_ISR_RealTime)isrrt
         ON mi.ISM_Nbr = isrrt.Ticket_Number and mi.Incident_Date = CAST(isrrt.Create_Date_EST AS DATE)
      ) t
      WHERE t.Incident_Date > '2015-01-01'
   )
   --ORDER BY isrt.Create_Date_EST desc
) t1

RETURN;
END

GO
