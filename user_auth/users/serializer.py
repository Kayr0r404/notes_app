from rest_framework import serializers
from .models import Note, CustomUser


class NoteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required=True, max_length=300)
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Note
        fields = ["id", "description", "content", "owner"]

    def create(self, validated_data):
        return Note.objects.create(**validated_data)


class UserRegistrationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(required=True, max_length=255)
    username = serializers.CharField(required=True, max_length=100)
    fullname = serializers.CharField(required=True, max_length=150)
    bio = serializers.CharField(required=False, allow_blank=True, default="")
    avatar = serializers.CharField(
        required=False, default="default_avatar.jpg", allow_null=True
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "username",
            "fullname",
            "bio",
            "avatar",
            "password",
        ]

    def create(self, validated_data):
        try:
            password = validated_data.pop("password")
            user = CustomUser(**validated_data)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))
