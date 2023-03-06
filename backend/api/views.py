from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note, Post
from .serializers import NoteSerializer, PostSerializer
from api import serializers

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET', 'POST'])
def getPosts(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-updated')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(200)
        return Response(serializer.errors)


@api_view(['GET', 'DELETE', 'PUT'])
def getPost(request, pk):
    if request.method == 'GET':
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    if request.method == 'PUT':
        data = request.data
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(instance=post, data=data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
    if request.method == 'DELETE':
        post = Post.objects.get(id=pk)
        post.delete()

        return Response("post was Deleted!")


@api_view(['GET', 'DELETE', 'PUT'])
def getNote(request, pk):
    if request.method == 'GET':
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    if request.method == 'PUT':
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
    if request.method == 'DELETE':
        note = Note.objects.get(id=pk)
        note.delete()

        return Response("notes was Deleted!")
