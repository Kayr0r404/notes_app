from django.urls import path
from . import views

urlpatterns = [
    path("dashboard/", views.dashboard, name="dashboard"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "token/refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("notes/", views.get_notes, name="get_notes"),
    path("logout", views.logout, name="logout"),
    path("register", views.register, name="user_registration"),
    path("register-note", views.create_note, name="create_new_note"),
    path("public-notes", views.get_all_notes, name="get_all_views"),
]
