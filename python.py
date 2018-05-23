print "hello world"....

a = [1,2,3,4,5,6,7,8,9]
b = [1,2,3,4,5,6,7,8]
c = [1,2,3,4,5,6,7]
d = [1,2,3,4,5,6]
e = [1,2,3,4,5,7]
f = [1,2,3,4,6,7]
g = [1,2,3,9,6,7]
h = [1,2,6,7]
j = [1,6,7]
first = dict(zip(a,[1 for i in range(len(a))]))
second = dict(zip(b,[1 for i in range(len(b))]))
third = dict(zip(c,[1 for i in range(len(c))]))
fourth = dict(zip(d,[1 for i in range(len(d))]))
fifth = dict(zip(e,[1 for i in range(len(e))]))
sixth = dict(zip(f,[1 for i in range(len(f))]))
seventh = dict(zip(g,[1 for i in range(len(g))]))
eigth = dict(zip(h,[1 for i in range(len(h))]))
ninth = dict(zip(j,[1 for i in range(len(j))]))

df1 = pd.DataFrame(first.items(),columns = ['client','values'])
diction = first

for key,val in diction.items():
    for key1,val1 in second.items():
        if (val >= 1):
            if (key == key1):
                diction[key] = val + val1

            
for key,val in diction.items():
    for key1,val1 in third.items():
        if (val >= 2):
            if (key == key1):
                diction[key] = val + val1           


for key,val in diction.items():
    for key1,val1 in fourth.items():
        if (val >= 3):
            if (key == key1):
                diction[key] = val + val1           

for key,val in diction.items():
    for key1,val1 in fifth.items():
        if (val >= 4):
            if (key == key1):
                diction[key] = val + val1        

for key,val in diction.items():
    for key1,val1 in sixth.items():
        if (val >= 5):
            if (key == key1):
                diction[key] = val + val1          

for key,val in diction.items():
    for key1,val1 in seventh.items():
        if (val >= 6):
            if (key == key1):
                diction[key] = val + val1          

for key,val in diction.items():
    for key1,val1 in eigth.items():
        if (val >= 7):
            if (key == key1):
                diction[key] = val + val1          

for key,val in diction.items():
    for key1,val1 in ninth.items():
        if (val >= 8):
            if (key == key1):
                diction[key] = val + val1    

df = pd.DataFrame(diction.items(),columns = ['client','error_log'])

df = df.merge(df1,on='client')
print (df)
