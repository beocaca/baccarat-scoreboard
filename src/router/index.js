import {createWebHistory, createRouter} from "vue-router";
import Home from '../pages'
import ScoreBoard from '../pages/score-board'
import NotFound from "@/views/NotFound";

const routes = [{
    path: "/", name: "Home", component: Home,
}, {
    path: "/score-board", name: "ScoreBoard", component: ScoreBoard,
}, {
    path: "/:catchAll(.*)", component: NotFound,
},];

const router = createRouter({
    history: createWebHistory(), routes,
});

export default router;