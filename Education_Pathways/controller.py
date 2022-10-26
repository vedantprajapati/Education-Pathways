# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse

# from flask_cors import cross_origin
from config import app
from model import *
from fuzzy import nysiis
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
        syllabus_search = request.args.get("syllabusSearch")

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
        if not TemplatedPathway.objects(title=title_):
            resp = jsonify({"message": f"Pathway {title_} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify(
                {"templated_pathway": TemplatedPathway.get_templated_pathway(title_)}
            )
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("title", required=True)
        parser.add_argument("pathway", required=True)
        parser.add_argument("comments", required=False)
        data = parser.parse_args()
        title = data["title"]
        pathway = data["pathway"]
        comments = data["comments"]
        try:
            templated_pathway_exists = TemplatedPathway.objects(title__exists=title)
            if not templated_pathway_exists:
                # kajsndaks
                templated_pathway = TemplatedPathway(
                    title=title, pathway=pathway, comments=comments
                )
                resp = jsonify(
                    {
                        "Template Added": TemplatedPathway.get_templated_pathway(
                            title_=title
                        )
                    }
                )
                resp.status_code = 200
                return resp
            else:

                courses = [Course.get(course_code) for course_code in pathway]
                comments = (
                    comments
                    if comments
                    else TemplatedPathway.get_templated_pathway(title=title).comments
                )
                TemplatedPathway.objects(title=title).update_one(
                    pathway=courses, comments=comments
                )
                resp = jsonify(
                    {
                        "Template Modified": TemplatedPathway.get_templated_pathway(
                            title_=title
                        )
                    }
                )
                resp.status_code = 200
                return resp

        except Exception as e:
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
