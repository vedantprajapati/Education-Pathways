from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient



# No longer supported 

# def test_user_wishlist_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist")

#     assert response.status_code == 200

def test_templated_pathway_dao():
    tester = app.test_client()
    response = tester.get("/templatedpathways/templatedpathwaydao")

    assert response.status_code == 200

# def test_user_wishlist_removeCourse_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist/removeCourse")

#     assert response.status_code == 200

# def test_user_wishlist_minorCheck_endpoint():
#     tester = app.test_client()
#     response = tester.get("/user/wishlist/minorCheck")

#     assert response.status_code == 200

