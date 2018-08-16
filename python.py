import re
import numpy as np

try:
    no_of_participants = raw_input("Enter number of participants in integer: ")
    while not re.match("^[0-9]*$", no_of_participants) or not no_of_participants:
        print ("participants number should be integer")
        no_of_participants = raw_input("Enter number of participants in integer: ")

except ValueError as e:
    print(e)
no_of_participants = int (no_of_participants)

ordinal = lambda n: "%d%s" % (n,"tsnrhtdd"[(n/10%10!=1)*(n%10<4)*n%10::4])
order = [ordinal(n) for n in range(1,no_of_participants + 1)]

order
veg_names = []
non_veg_names = []

import re
for i in range(0,no_of_participants):
    name = raw_input("Enter name of " + order[i] + " participant:")
    while not re.match("^[a-zA-Z_ ]*$", name) or not name:
        print "Error! Only letters a-z allowed!"
        name = raw_input("Enter name of " + order[i] + " participant:")
    choice = raw_input("press 0 for veg and 1 for non veg :")
    while not re.match("^[0-1]*$", name) or not name:
        print "Error! press 0 for veg and 1 for non veg"
        choice = raw_input("press 0 for veg and 1 for non veg :")
    names.append(name)

print ("participants list :",names)


veg_items_count = raw_input("Enter number of veg items: ")
while not re.match("^[0-9]*$", veg_items_count) or not veg_items_count:
    print ("number should be integer")
    veg_items_count = raw_input("Enter number of veg items: ")
veg_items_count = int(veg_items_count)
    
veg_items = []
for i in range(0,veg_items_count):
    veg_item = raw_input("Enter name of " + order[i] + " item:")
    while not re.match("^[a-zA-Z_ ]*$", veg_item) or not veg_item:
        print "Error! Only letters a-z allowed!"
        veg_item = raw_input("Enter name of " + order[i] + " item:")
    veg_items.append(veg_item)
    
non_veg_items_count = raw_input("Enter number of non veg items: ")
while not re.match("^[0-9]*$", non_veg_items_count) or not non_veg_items_count:
    print ("number should be integer")
    non_veg_items_count = raw_input("Enter number of non veg items: ")
non_veg_items_count = int(non_veg_items_count)
non_veg_items = []
for i in range(0,non_veg_items_count):
    non_veg_item = raw_input("Enter name of " + order[i] + " item:")
    while not re.match("^[a-zA-Z_ ]*$", non_veg_item) or not non_veg_item:
        print "Error! Only letters a-z allowed!"
        veg_item = raw_input("Enter name of " + order[i] + " item:")
    non_veg_items.append(non_veg_item)
