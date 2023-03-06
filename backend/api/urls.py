from . import views
from django.urls import path

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    # path('notes/', views.getNotes, name="notes"),
    path('posts/', views.getPosts, name="posts"),
    # # path('notes/create/',views.createNote,name="create-notes"),
    # path('notes/<str:pk>/update/',views.updateNote,name="update-note"),
    # path('notes/<str:pk>/delete/',views.deleteNote,name="delete-note"),
    # path('notes/<str:pk>/', views.getNote, name="note"),
    path('posts/<str:pk>/', views.getPost, name="post"),
]
