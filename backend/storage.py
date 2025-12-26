import hashlib
import json


def get_users():
    with open('storage/users.json', 'r') as f:
        users = json.load(f)
    return users

def check_user(username: str, password: str):
    users = get_users()
    for user in users:
        if user['username'] == username and password == user['password']:
            return user
    return False