from django.shortcuts import render
from .models import CustomUser, Note
from .serializer import NoteSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens.get("access")
            refresh_token = tokens.get("refresh")

            if not access_token or not refresh_token:
                return Response(
                    {"Success": False, "error": "Tokens not provided"}, status=400
                )
            user = CustomUser.objects.get(email=request.data["email"])
            user_data = UserRegistrationSerializer(user).data
            res = Response({"Success": True, "user": user_data}, status=200)
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
                # domain="localhost:8000",
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
                # domain="localhost:8000",
            )
            return res
        except Exception as e:
            return Response({"Success": False, "error": str(e)}, status=400)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response(
                {"Success": False, "error": "Refresh token not provided"}, status=401
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"Success": False, "error": str(e)}, status=401)

        access_token = serializer.validated_data["access"]
        token = AccessToken(access_token)
        user_id = token["user_id"]
        user = CustomUser.objects.get(id=user_id)
        user_data = UserRegistrationSerializer(user).data
        res = Response({"Success": True, "user": user_data}, status=200)
        res.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
        )
        return res


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    try:
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(
            {"error": "Registration failed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request):
    try:
        res = Response()
        res.data = {"Succes": True}
        res.delete_cookie("access_token", path="/", samesite="None")
        res.delete_cookie("refresh_token", path="/", samesite="None")
        return res
    except:
        return Response({"Success": False})


@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_notes(request):
    """"""

    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def dashboard(request):
    return render(request, "users/dashboard.html")
