import {UserController} from "./controller/UserController";
import MessageController from "./controller/MessageController";
import ChatController from "./controller/ChatController";
import ConnectionsController from "./controller/ConnectionsController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
},
    {
        method: "get",
        route: "/messages",
        controller: MessageController,
        action: "all"
    }, {
        method: "get",
        route: "/messages/:id",
        controller: MessageController,
        action: "one"
    }, {
        method: "post",
        route: "/messages",
        controller: MessageController,
        action: "save"
    }, {
        method: "delete",
        route: "/messages/:id",
        controller: MessageController,
        action: "remove"
    }, {
        method: "post",
        route: "/chat`",
        controller: ChatController,
        action: "login"
    },
    {
        method: "get",
        route: "/chat",
        controller: ChatController,
        action: "all"
    }, {
        method: "get",
        route: "/chat/:id",
        controller: ChatController,
        action: "one"
    }, {
        method: "post",
        route: "/chat",
        controller: ChatController,
        action: "save"
    }, {
        method: "delete",
        route: "/chat/:id",
        controller: ChatController,
        action: "remove"
    }, {
        method: "post",
        route: "/connections",
        controller: ConnectionsController,
        action: "save"
    },
    {
        method: "get",
        route: "/connections/:id",
        controller: ConnectionsController,
        action: "all"
    },
    {
        method: "patch",
        route: "/connections/:id",
        controller: ConnectionsController,
        action: "update"
    },
    {
        method: "delete",
        route: "/connections/:id",
        controller: ConnectionsController,
        action: "remove"
    }
];

