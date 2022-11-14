# this is the controller

from flask import jsonify, request, send_file
from flask_restful import Resource, reqparse

# from flask_cors import cross_origin
from config import app
from model import *
from fuzzy import nysiis
import werkzeug
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
import re


# -------------------- User related --------------------
class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("password", required=True)
        data = parser.parse_args()
        username = data["username"]
        password = data["password"]

        if User.objects(username=username):
            resp = jsonify({"message": "Username already exists"})
            resp.status_code = 409
            return resp

        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class UserUpdatePwd(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("password", required=True)
        data = parser.parse_args()
        username = data["username"]
        password = data["password"]
        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("password", required=True)
        data = parser.parse_args()
        username = data["username"]
        password = data["password"]
        try:
            if User.verify_password(username, password):
                resp = jsonify({"username": username})
                resp.status_code = 200
            else:
                resp = jsonify({"message": "Login failed"})
                resp.status_code = 401
                return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


# ------------------------------------------------------------

# -------------------- Course related --------------------
class SearchCourse(Resource):
    def get(self):
        input = request.args.get("input")
        faculty = request.args.get("faculty")
        course_level = request.args.get("courseLevel")

        code = re.findall("[a-zA-Z]{3}\d{3}[hH]?\d?", input)
        if code:
            code = code[0].upper()
            if len(code) == 6:
                code += "H1"
            elif len(code) == 5:
                code += "1"
            if Course.objects(code=code):
                try:
                    resp = jsonify({"course": Course.get(code)})
                    resp.status_code = 200
                    return resp
                except Exception as e:
                    resp = jsonify({"error": "something went wrong"})
                    resp.status_code = 400
                    return resp
        input = " ".join([nysiis(w) for w in input.split()])
        try:
            course_filter = ""
            if faculty != "all":
                if faculty == "artsci":
                    # Art Sci Course Codes Should Be Fetched From Database Later (below is for demonstration purposes)
                    course_filter = "(PHL|CSC|ANT|FAH|BCH|AST|SOC|PSY)"
                else:
                    course_filter += faculty
            if course_level != "all":
                course_filter += course_level.replace("0", "\d")

            if input == "":
                search = Course.objects(code__regex=course_filter)[:10]
            else:
                search = Course.objects(code__regex=course_filter).search_text(input).order_by("$text_score")

            resp = jsonify(search)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("input", required=True)
        data = parser.parse_args()
        input = data["input"]
        code = re.findall("[a-zA-Z]{3}\d{3}[hH]?\d?", input)
        if code:
            code = code[0].upper()
            if len(code) == 6:
                code += "H1"
            elif len(code) == 5:
                code += "1"
            if Course.objects(code=code):
                try:
                    resp = jsonify({"course": Course.get(code)})
                    resp.status_code = 200
                    return resp
                except Exception as e:
                    resp = jsonify({"error": "something went wrong"})
                    resp.status_code = 400
                    return resp
        input = " ".join([nysiis(w) for w in input.split()])
        try:
            search = Course.objects.search_text(input).order_by("$text_score")
            resp = jsonify(search)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class ShowCourse(Resource):
    def get(self):
        code = request.args.get("code")
        if not Course.objects(code=code):
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"course": Course.get(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        if not Course.objects(code=code):
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"course": Course.get(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class ShowCourseGraph(Resource):
    def get(self):
        code = request.args.get("code")
        if not Course.objects(code=code):
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"graph": Course.get_requisite_graph(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        if not Course.objects(code=code):
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"graph": Course.get_requisite_graph(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

class SyllabusHandler(Resource):
    def get(self):
        code = request.args.get("code")
        syl = Syllabus.objects(course_code=code)

        if not syl: 
            resp = jsonify({"error": f"No syllabus for {code}"})
            resp.status_code =400
            return resp
        try:
            syl = syl.first().file
            resp = send_file(
                path_or_file=syl,
                mimetype="application/octet-stream",
                as_attachment=True,
                download_name=f"{code}_Syllabus")
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            print(e)
            return resp  
       
    def post(self):

        # Make sure file isn't empty
        if len(request.files)!=0:
            code = request.form['code']
            file = request.files['file']
        else:
            resp = jsonify({"error": "Missing file"})
            resp.status_code = 400
            return resp

        # Ensure correct file type
        if (file.filename).rsplit(".", 1)[1].lower() != "pdf":
                resp = jsonify({"error": "Invalid file type"})
                resp.status_code = 400
                return resp
        
        try:
            syl = Syllabus.objects(course_code=code).first()
            if syl:
                syl.file.replace(file)
                syl.save()
            else:
                syl = Syllabus(course_code=code)
                syl.file.put(file)
                syl.save()
            resp = jsonify({"message": f"Added syllabus to {code}"})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

# ------------------------------------------------------------

# -------------------- Wishlist related --------------------
class UserWishlist(Resource):
    def get(self):
        username = request.args.get("username")
        try:
            resp = jsonify({"wishlist": User.get_wishlist(username_=username).expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        data = parser.parse_args()
        username = data["username"]
        try:
            resp = jsonify({"wishlist": User.get_wishlist(username_=username).expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        if not Course.objects(code=code):
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp


# ------------------------------------------------------------


class UserWishlistAdd(Resource):
    def get(self):
        username = request.args.get("username")
        code = request.args.get("code")
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.add_course(course)
            resp = jsonify({"wishlist": wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        username = data["username"]
        code = data["code"]
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.add_course(course)
            resp = jsonify({"wishlist": wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class UserWishlistRemove(Resource):
    def get(self):
        username = request.args.get("username")
        code = request.args.get("code")
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.remove_course(course)
            resp = jsonify({"wishlist": wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        username = data["username"]
        code = data["code"]
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.remove_course(course)
            resp = jsonify({"wishlist": wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class UserWishlistMinorCheck(Resource):
    def get(self):
        username = request.args.get("username")
        try:
            wl = User.get_wishlist(username_=username)
            courses = [c.code for c in wl.course]
            check = Minor.check(codes_=courses)
            resp = jsonify({"minorCheck": check})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        data = parser.parse_args()
        username = data["username"]
        try:
            wl = User.get_wishlist(username_=username)
            courses = [c.code for c in wl.course]
            check = Minor.check(codes_=courses)
            resp = jsonify({"minorCheck": check})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


# Templated Pathways --------------------------------------------------------------


class TemplatedPathwayDao(Resource):
    def get(self):
        title_ = request.args.get("title")
        if not title_:
            return jsonify({"error": "title is required"}), 400
        try:
            search = TemplatedPathway.objects(title__contains=title_)[:10]
            search = list(search) + list(TemplatedPathway.objects(comments__contains=title_)[0:10])
            if len(search) == 0:
                resp = jsonify({"message": f"Could not find a pathway using search: \"{title_}\""})
                resp.status_code = 404
                return resp
            resp = jsonify(search)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("title", required=True)
        parser.add_argument("pathway", required=True, action= "append")
        parser.add_argument("comments", required=False)
        data = parser.parse_args()
        title = data["title"]
        pathway = [] 
        pathway = data["pathway"]
        comments = data["comments"]
        # print(title, pathway, comments)
        print(data["pathway"])
        try:
            # templated_pathway_exists = TemplatedPathway.objects(title__exists=title)
            # define a new variable detecting if the templated pathway exists
            templated_pathway_exists = TemplatedPathway.objects(title=title)          
            print(not templated_pathway_exists)
            # print(templated_pathway_exists["TemplatePathway"])
            if not templated_pathway_exists:
                # kajsndaks
                print("not templated pathway exists")
                templated_pathway = TemplatedPathway(
                    title=title, pathway=pathway, comments=comments
                )
                print("templated pathway created")
                # resp = jsonify(
                #     {
                #         "Template Added": TemplatedPathway.get_templated_pathway(
                #             title_=title
                #         ).expand()
                #     }
                # )
                resp= jsonify({"Template Added": "templated pathway created"})
                # resp = jsonify({"Template Added"})
                # print("jsonified, resp: ", resp)
                resp.status_code = 200
                print("status code 200")
                templated_pathway.save(validate=False, force_insert=True)
                print("templated pathway saved")
                return resp
            else:
                print("templated pathway exists")
                # # courses = TemplatedPathway.get_templated_pathway(title=title)["Pathway"]
                # courses = []
                # courses = pathway
                # # courses = [Course.get(course_code) for course_code in pathway]
                # # get the courses from the pathway
                # # courses = [Course.get(course_code) for course_code in pathway]
                # print("courses: ", courses)
                # # print(courses)
                # comments = (
                #     comments
                #     if comments
                #     else TemplatedPathway.get_templated_pathway(title=title)["comments"]
                # )
                # print("comments: ", comments)
                # TemplatedPathway.objects(title=title).update_one(
                #     pathway=courses, comments=comments
                # )
                # update the pathway and comments
                # templated_pathway = TemplatedPathway(title=title, pathway=courses, comments=comments)
                # print("templated pathway updated")
                resp= jsonify("Template with same name already exisits. Please use a different name.")
                print("jsonified, resp: ", resp)
                resp.status_code = 200
                print("status code 200")
                # templated_pathway.save(validate=True, force_insert=False)
                # print("templated pathway updated")
                return resp

        except Exception as e:
            print(e.with_traceback)
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class TopTemplatedPathways(Resource):
    def get(self):
        try:
            pathways = [
                {
                    "title": tp.title,
                    "pathway": [tp.pathway[i].id for i in range(len(tp.pathway))],
                    "comments": tp.comments,
                }
                for tp in TemplatedPathway.objects()
            ]
            resp = jsonify({"top_pathways": pathways})
            resp.status_code = 200

            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        resp = jsonify({"error": "something went wrong"})
        resp.status_code = 400
        return resp
