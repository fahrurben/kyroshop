from rest_framework.views import APIView, Response, status
from rest_framework.permissions import IsAuthenticated
from ..serializers import ProfileSerializer, UserSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProfileSerializer(data=request.data, context={'user': self.request.user})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            user_serializer = UserSerializer(instance=user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)