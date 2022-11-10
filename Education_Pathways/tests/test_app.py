from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient
from model import TemplatedPathway

# Jean
def test_check_course_in_minor():
    course = "MIE439H1S"
    minor = "Biomedical Engineering Minor"
    result = check_course_in_minor(course)

    assert result == minor

# Cansin
def test_user_register_endpoint():
    tester = app.test_client()
    response = tester.get("/user/register")

    assert response.status_code == 200

def test_user_login_endpoint():
    tester = app.test_client()
    response = tester.get("/user/login")

    assert response.status_code == 200

def test_search_endpoint():
    tester = app.test_client()
    response = tester.get("/search")

    assert response.status_code == 200

def test_course_details_endpoint():
    tester = app.test_client()
    response = tester.get("/course/details?code=ECE361H1")

    assert response.status_code == 200

def test_course_graph_endpoint():
    tester = app.test_client()
    response = tester.get("/course/graph?code=ECE361H1")

    assert response.status_code == 200

def test_templated_pathways():
    Template = TemplatedPathway(title='Test_Title', comments='My_Comments',pathway=['ECE361H1', 'ECE319H1'])
    if TemplatedPathway.objects(title='Test_Title').count() == 0:
        Template.save()

    assert Template.title == 'Test_Title'
    assert Template.comments == 'My_Comments'
    assert [course.id for course in Template.pathway] == ['ECE361H1', 'ECE319H1']
    assert Template.get_templated_pathway('Test_Title') == {'title': Template.title, 'comments': Template.comments, 'pathway': [course.id for course in Template.pathway]}
    tester = app.test_client()
    
    response = tester.get("/templated_pathways?title=Test_Title")
    assert response.status_code == 200

    TemplatedPathway.objects(title='Test_Title').delete()

# No longer supported 

# def test_user_wishlist_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist")

#     assert response.status_code == 200

# def test_user_wishlist_addCourse_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist/addCourse")

#     assert response.status_code == 200

# def test_user_wishlist_removeCourse_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist/removeCourse")

#     assert response.status_code == 200

# def test_user_wishlist_minorCheck_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist/minorCheck")

#     assert response.status_code == 200

