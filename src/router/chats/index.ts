import * as Router from 'koa-router';
import { createChat, getChat, getChats } from './handlers/chatsHandlers';

const commonChatsRouter = new Router();

commonChatsRouter.get('/', getChats);
commonChatsRouter.get('/:name', getChat);
commonChatsRouter.post('/', createChat);

export default commonChatsRouter.routes();
