import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
#from flask_pymongo import PyMongo
from thisisatest import application_name_dropdown, application_name_table, control_name_table, automation_id_table, data_type_dropdown
import pymongo
import re
from collections import OrderedDict
from datetime import datetime

app = Flask(__name__)
api = Api(app)
cors = CORS(app)

# class HelloWorld(Resource):
#     def get(self):
#         return {'about' : 'Hello World!'}

#     def post(self):
#         some_json = request.get_json()
#         return {'you sent' : some_json}, 201


class Get_Id(Resource):
    def get(self):
        app_name_dict = application_name_dropdown()
        # app_name_list = a()
        # with open("showapplications.json", "w") as outfile: 
        #     json.dump(app_name_list, outfile, indent=4)
        # app_json = json.dumps(app_name_dict)
        # str_randd= "Done"
        # return render_template("base.html", app_name_dict = app_name_dict)
        # y = json.dump(app_name_dict).decode(str_w_quotes)
        # return json.loads(json.dumps(app_name_dict))
        return app_name_dict
        # return app_name_list

    #def post(self):
        # application_name_selection = 'lplecm.crm.dynamics.com'
        # control_name_table_list = application_name_table(application_name_selection) 
        # return control_name_table_list


class Get_table_data(Resource):
     def get(self, id):
        control_name_table_list = application_name_table(id) 
        a ={'data':control_name_table_list}
        return(a)
        




api.add_resource(Get_Id, '/')
api.add_resource(Get_table_data, '/<string:id>')
# api.add_resource(Control_type_table, '/ctt')
# api.add_resource(Get_control_type, '/gct')
# api.add_resource(control_name_table, '/cnt')

if __name__ == '__main__' :
    app.run(debug = True)