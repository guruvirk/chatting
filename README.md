# Chatting

## Creating user

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234",
    "code": "test2"
}
```

## Login

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234"
}
```

## Conversation

Headers 

```JavaScript 
{
    "x-session": "############"
}
```

### Create

```JavaScript 
{
	"name":"####",
    "users": [
        "## user.code ##"
    ]
}
```

### Search

Response

```JavaScript 
{
	"isSuccess": true,
    "data": []
}
```

### Get

Response

```JavaScript 
{
	"isSuccess": true,
    "data": {}
}
```

### Mark all messages viewed

Response

```JavaScript 
{
	"isSuccess": true,
    "data": "updated"
}
```

## Message

Headers 

```JavaScript 
{
    "x-session": "############"
}
```

### Create

```JavaScript 
{
    "body": "####",
    "to": [
        "####"
    ],
    "conversation": {
        "id": "############"
    }
}
```

### Search

Params

```JavaScript 
{
	"conversation-id": "############"
}
```

Response

```JavaScript 
{
	"isSuccess": true,
    "data": []
}
```