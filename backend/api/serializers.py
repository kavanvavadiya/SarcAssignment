from rest_framework.serializers import ModelSerializer
from .models import Note, Post


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
