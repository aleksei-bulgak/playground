(this.webpackJsonpgame=this.webpackJsonpgame||[]).push([[0],{15:function(e,t,n){"use strict";n.d(t,"e",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return l}));var r=n(19),c=n(18),a=Object(r.c)({name:"common",initialState:{loader:!0,errorMessage:null},reducers:{loader:function(e,t){e.loader=t.payload},error:function(e,t){e.errorMessage=t.payload},cleareError:function(e,t){e.errorMessage=null}}}),o=Object(c.a)((function(e){return e.common}),(function(e){return e.errorMessage})),i=a.actions,u=i.loader,s=i.error,l=i.cleareError;t.b=a.reducer},34:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return a}));var r=n(27),c=function(){return Object(r.b)()},a=r.c},42:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return j})),n.d(t,"e",(function(){return p}));var r=n(41),c=n.n(r),a=n(53),o=n(19),i=n(18),u=n(15),s=Object(o.b)("game/infoChange",function(){var e=Object(a.a)(c.a.mark((function e(t,n){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,n.dispatch(Object(u.d)(!0)),n.dispatch(f(t)),e.next=10;break;case 5:return e.prev=5,e.t0=e.catch(0),r=e.t0.message||"Failed to update game info",n.dispatch(Object(u.c)(r)),e.abrupt("return",n.rejectWithValue(r));case 10:return e.prev=10,n.dispatch(Object(u.d)(!1)),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[0,5,10,13]])})));return function(t,n){return e.apply(this,arguments)}}()),l=Object(o.c)({name:"game",initialState:{},reducers:{setGameInfo:function(e,t){e.gameId=t.payload.gameId,e.serverUrl=t.payload.serverUrl},setVideoUrl:function(e,t){e.videoUrl=t.payload},setActionKey:function(e,t){var n,r;e.actionKey=null===(n=t.payload)||void 0===n?void 0:n.key,e.actionType=null===(r=t.payload)||void 0===r?void 0:r.type}}}),d=Object(i.a)((function(e){return e.game}),(function(e){return{gameId:e.gameId,serverUrl:e.serverUrl}})),j=(Object(i.a)((function(e){return e.game}),(function(e){return{videoUrl:e.videoUrl}})),Object(i.a)((function(e){return e.game}),(function(e){return{actionKey:e.actionKey,actionType:e.actionType}}))),b=l.actions,f=b.setGameInfo,p=(b.setVideoUrl,b.setActionKey);t.a=l.reducer},62:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(16),o=n.n(a),i=(n(62),n(52)),u=n(4),s=n(89),l=n(3),d=Object(s.a)({loader:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}),j=function(){var e=d();return Object(l.jsxs)("div",{className:e.loader,children:[Object(l.jsx)("h1",{children:"Loading session info!"}),Object(l.jsx)("p",{children:"Please wait...."})]})},b=n(34),f=n(15),p=n(95),m=n(97),O=Object(s.a)({alert:{position:"absolute",top:0,width:"100%"}}),h=function(){var e=O(),t=Object(b.b)(f.e),n=Object(b.a)();return Object(l.jsx)(l.Fragment,{children:!!t&&Object(l.jsxs)(p.a,{severity:"error",className:e.alert,onClose:function(){return n(Object(f.a)())},children:[Object(l.jsx)(m.a,{children:"Error"}),t]})})},g=Object(r.lazy)((function(){return Promise.all([n.e(3),n.e(6)]).then(n.bind(null,143))})),v=Object(r.lazy)((function(){return Promise.all([n.e(4),n.e(5)]).then(n.bind(null,147))}));var y=function(){return Object(l.jsx)(i.a,{children:Object(l.jsxs)(r.Suspense,{fallback:Object(l.jsx)(j,{}),children:[Object(l.jsx)(h,{}),Object(l.jsxs)(u.d,{children:[Object(l.jsx)(u.b,{path:"/game",component:v}),Object(l.jsx)(u.b,{path:"/login",component:g}),Object(l.jsx)(u.a,{to:"/login"})]})]})})},x=n(19),U=n(42),I=Object(x.a)({reducer:{common:f.b,game:U.a},middleware:Object(x.d)({thunk:!0})}),k=n(27);o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(k.a,{store:I,children:Object(l.jsx)(y,{})})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.f5b3c91b.chunk.js.map