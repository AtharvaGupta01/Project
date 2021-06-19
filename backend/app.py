import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from thisisatest import application_name_dropdown, application_name_table, control_name_table, automation_id_table
import pymongo
import re
from collections import OrderedDict
from datetime import datetime

app = Flask(__name__)
api = Api(app)
cors = CORS(app)

class Get_Id(Resource):
    def get(self):
        app_name_dict = application_name_dropdown()
        return app_name_dict

class Get_table_data(Resource):
     def get(self, id):
        control_name_table_list = application_name_table(id) 
        a ={'data':control_name_table_list}
        return(a)
        
class Get_second_table_data1(Resource):
     def get(self, id, ct):
        control_type_table_list = control_name_table(id,ct) 
        a ={'data':control_type_table_list}
        return(a)

class Get_second_table_data2(Resource):
     def get(self, id, ct):
        control_type_table_list = automation_id_table(id,ct)
        b = {'data': control_type_table_list}
        return (b)


api.add_resource(Get_Id, '/')
api.add_resource(Get_table_data, '/<string:id>')
api.add_resource(Get_second_table_data1, '/<string:id>/<string:ct>/1', endpoint="1") # ct is number
api.add_resource(Get_second_table_data2, '/<string:id>/<string:ct>/2', endpoint="2")
# api.add_resource(Control_type_table, '/ctt')
# api.add_resource(Get_control_type, '/gct')
# api.add_resource(control_name_table, '/cnt')

if __name__ == '__main__' :
    app.run(debug = True)