"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarRouter_1 = __importDefault(require("./Routers/CalendarRouter"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// app.use('/feed', router);
app.use(CalendarRouter_1.default);
app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중');
});
/*
...
const passport = require('passport');

...
const passportConfig = require('./passport');

...
const authRouter = require('./routes/auth'); // 인증 라우터

const app = express();
passportConfig(); // 패스포트 설정

...
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
   session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   }),
);
//! express-session에 의존하므로 뒤에 위치해야 함
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다.

//* 라우터
app.use('/auth', authRouter);

...
 */
//# sourceMappingURL=index.js.map