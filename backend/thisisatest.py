import pymongo
import re
from collections import OrderedDict
from datetime import datetime

def a():
    myclient = pymongo.MongoClient("mongodb://localhost:27017", username="", password="")
    raw_events_db = myclient["raw_events_db"]
    events_collection = raw_events_db["events"]
    applications_db = myclient['applications_db']
    applications_collection= applications_db['applications']

    applications_documents = applications_collection.find({},projection = {"_id":1,"name":1}).sort("name")
    app_id_app_name_dict = {}
    for x in applications_documents:
        app_id = x['_id'].strip()
        app_name = x['name'].strip()
        app_id_app_name_dict[app_id] = app_name
    # print("# Applications: ",len(app_id_app_name_dict))


    #Get events per application
    pipeline= [{"$group": {"_id": "$application_id", "count": {"$sum": 1}}}]
    app_id_event_count_doc = events_collection.aggregate(pipeline)
    app_id_event_count_dict  = {}

    total_count = 0
    for x in app_id_event_count_doc:
        app_id = x['_id'].strip()
        event_count = x['count']
        total_count += event_count
        app_id_event_count_dict[app_id] = event_count

    app_id_event_count_dict =  OrderedDict(sorted(app_id_event_count_dict.items(), key=lambda kv:(kv[1], kv[0]), reverse=True))
    # for app_id in app_id_event_count_dict:
    #     print(app_id," - ", app_id_app_name_dict[app_id], " - ", app_id_event_count_dict[app_id])

    # print("Total Event Count: ",total_count)

    return app_id_app_name_dict





def b():
    start_time = datetime.now()

    for app_id in app_id_event_count_dict:
        #app_id = "510f81328779ba7557153d96d6a09ac2"
        # if app_id != "541cc79a8638cfd34bdc56d1a27c8cd7":
            # continue
        print("--------------------------------")
        print(app_id_app_name_dict[app_id])
        
        app_id_title_docs = events_collection.find({"application_id": app_id}, projection={'title':1, 'specifications.event_path':1})
        print("\t #Documents: ",app_id_title_docs.count())

        title_set = set({})
        event_path_set = set({})
        for x in app_id_title_docs:
            title_set.add(x['title'])
            event_path_set.add(x['specifications']['event_path'])

        end_time = datetime.now()
        # print("3")
        f = open("C:\\Users\\cnaag\\Downloads\\Schneider\\"+app_id_app_name_dict[app_id].replace(":","_").replace("-","_")+"_title.txt",'w', encoding="utf-8")
        for title in title_set:
            f.write(title)
            f.write("\n")
        f.close()
        # print("1")
        f = open("C:\\Users\\cnaag\\Downloads\\Schneider\\"+app_id_app_name_dict[app_id].replace(":","_").replace("-","_")+"_event_path.txt",'w', encoding="utf-8")
        # print("2")
        for event_path in event_path_set:
            f.write(event_path)
            f.write("\n")
        f.close()

        print("\t #Titles: ",len(title_set))
        print("\t #Event Paths: ",len(event_path_set))
        print("\t Took ",(end_time-start_time).total_seconds()," secs.")


    input_dir = "C:\\Users\\cnaag\\Downloads\\Schneider\\"
    application_name = 'lplecm.crm.dynamics.com'.replace("-","_")


    control_type_control_name_set_dict = {}
    control_type_automation_id_set_dict = {}
    control_type_automation_id_count_dict = {}

    f = open(input_dir + application_name+"_event_path.txt",'r', encoding='utf-8')
    lines = f.readlines()

    for line in lines:
        event_path = line.strip()
        if len(event_path) == 0:
            continue
        #if 'user' in event_path.lower():
        #    print(event_path)
        event_path_items = event_path.split("\/")
        for event_path_item in event_path_items:
            event_path_item_elements = event_path_item.split("\|")
            if len(event_path_item_elements) < 4:
                continue
            automation_id = event_path_item_elements[1][3:].strip()
            control_type = event_path_item_elements[2][2:].strip()
            control_name = event_path_item_elements[3][2:].strip()
            
            if control_type in control_type_control_name_set_dict:
                control_type_control_name_set = control_type_control_name_set_dict[control_type]
            else:
                control_type_control_name_set = set({})
            control_type_control_name_set.add(control_name)
            control_type_control_name_set_dict[control_type] = control_type_control_name_set
            
            if control_type in control_type_automation_id_set_dict:
                control_type_automation_id_set = control_type_automation_id_set_dict[control_type]
                
            else:
                control_type_automation_id_set = set({})
            control_type_automation_id_set.add(automation_id)
            control_type_automation_id_set_dict[control_type] = control_type_automation_id_set

            if control_type in control_type_automation_id_count_dict:
                automation_id_count_dict = control_type_automation_id_count_dict[control_type]
            else:
                automation_id_count_dict = {}
            count = 1
            if automation_id in automation_id_count_dict:
                count += automation_id_count_dict[automation_id]
            automation_id_count_dict[automation_id] = count
            control_type_automation_id_count_dict[control_type] = automation_id_count_dict
            
    control_type_control_name_count_dict = {}
    for control_type in control_type_control_name_set_dict:
        control_type_control_name_count_dict[control_type] = len(control_type_control_name_set_dict[control_type])
    control_type_control_name_count_dict = OrderedDict(sorted(control_type_control_name_count_dict.items(), key=lambda kv:(kv[1], kv[0]), reverse=True))

    for control_type in control_type_automation_id_count_dict:
        automation_id_count = control_type_automation_id_count_dict[control_type]
        automation_id_count = OrderedDict(sorted(automation_id_count.items(), key=lambda kv:(kv[1], kv[0]), reverse=True))
        control_type_automation_id_count_dict[control_type] = automation_id_count
        
    for control_type in control_type_control_name_count_dict:
        print(control_type, control_type_control_name_count_dict[control_type])


    for control_name in sorted(control_type_control_name_set_dict['50026']):
        #if "Realize Your Potential" in control_name:
            print(control_name)


    automation_id_count_dict = control_type_automation_id_count_dict['50026']
    for automation_id in automation_id_count_dict:
        print(automation_id, automation_id_count_dict[automation_id])


    def prune_hashes(sentence):
        regex = re.compile("#[A-Fa-f0-9]{64,}#", re.IGNORECASE)
        modified_sentence = sentence
        matches = re.findall(regex, modified_sentence)
        for match in matches:
            modified_sentence = modified_sentence.replace(match, '')

        return modified_sentence.strip()

