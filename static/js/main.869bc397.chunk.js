(this["webpackJsonp\uc6cc\ub4e4"]=this["webpackJsonp\uc6cc\ub4e4"]||[]).push([[0],{106:function(e,t,c){},107:function(e,t,c){},109:function(e,t,c){},113:function(e,t,c){},114:function(e,t,c){},115:function(e,t,c){},119:function(e,t,c){},121:function(e,t,c){"use strict";c.r(t);var a=c(0),s=c.n(a),n=c(22),r=c.n(n),i=c(4),l=c.n(i),o=c(75),j=c(10),d=(c(82),c(3)),u=c(13),b=c(52),m=c(6),O=c(28),h=c.n(O),f=c(53),x=c.n(f),v=c(54),p=c.n(v),k=c(20),N=c.n(k),g=c(129),S=c(27),w=(c(106),c(7)),y=(c(107),c(1)),C=function(e){var t=Object(a.useState)(0),c=Object(m.a)(t,2),s=c[0],n=c[1];return Object(a.useEffect)((function(){if("sssss"===e.checkList[e.curRow])for(var t=function(e){setTimeout((function(){return n(e+1)}),200*e)},c=0;c<5;++c)t(c);else n(0)}),[e.checkList]),Object(y.jsx)("div",{className:"game-body",children:Array(6).fill(0).map((function(t,c){return Object(y.jsx)("div",{className:l()("game-body-row",{shake:c===e.curRow&&e.shake}),children:Array(5).fill(0).map((function(t,a){return Object(y.jsx)("div",{className:l()("item","item-".concat(a+1),[e.lettersList[c][a]?"letter":"empty"],Object(w.a)({},e.checkList[c][a],e.checkList[c][a]),{jump:c===e.curRow&&0<s&&a<s}),children:e.lettersList[c][a]},"".concat(c,"_").concat(a))}))},c)}))})},M={letters:["","","","","",""],checks:["","","","","",""],keyMap:{},curRow:0,id:0,state:"PLAYING"},I=function(){var e=localStorage.getItem("gameData");return e?JSON.parse(e):(localStorage.setItem("gameData",JSON.stringify(M)),N.a.cloneDeep(M))},D=function(e){localStorage.setItem("gameData",JSON.stringify(e))},L=c(67),T=c.n(L),E=c(68),H=c.n(E),R=(c(109),function(e){return Object(y.jsxs)("div",{className:"game-header align-items-center justify-content-between py-2 border-bottom",children:[Object(y.jsx)("button",{onClick:e.onClickHowTo,children:Object(y.jsx)(T.a,{})}),Object(y.jsx)("h1",{className:"m-0 p-0",children:"\uc6cc\ub4e4"}),Object(y.jsx)("div",{children:Object(y.jsx)("button",{onClick:e.onClickStatistics,children:Object(y.jsx)(H.a,{})})})]})}),F=c(69),B=c.n(F),J=(c(113),function(e){return Object(y.jsxs)("div",{className:"game-keyboard",children:[Object(y.jsx)("div",{className:"game-keyboard-row",children:["\u3142","\u3148","\u3137","\u3131","\u3145","\u315b","\u3155","\u3151","\u3150","\u3154"].map((function(t){return Object(y.jsx)("div",{className:l()("item",Object(w.a)({},e.keyMap[t],e.keyMap[t])),onClick:function(){return e.onClickKeyboard(t)},children:t},t)}))}),Object(y.jsx)("div",{className:"game-keyboard-row",children:["\u3141","\u3134","\u3147","\u3139","\u314e","\u3157","\u3153","\u314f","\u3163"].map((function(t){return Object(y.jsx)("div",{className:l()("item",Object(w.a)({},e.keyMap[t],e.keyMap[t])),onClick:function(){return e.onClickKeyboard(t)},children:t},t)}))}),Object(y.jsxs)("div",{className:"game-keyboard-row",children:[Object(y.jsx)("button",{className:"item",disabled:e.curLetters.length<5,onClick:e.onClickEner,children:"ENTER"}),["\u314b","\u314c","\u314a","\u314d","\u3160","\u315c","\u3161"].map((function(t){return Object(y.jsx)("div",{className:l()("item",Object(w.a)({},e.keyMap[t],e.keyMap[t])),onClick:function(){return e.onClickKeyboard(t)},children:t},t)})),Object(y.jsx)("button",{className:"item",disabled:0===e.curLetters.length,onClick:e.onClickBack,children:Object(y.jsx)(B.a,{})})]})]})}),z=c(130),A=(c(114),function(e){return Object(y.jsxs)(z.a,{className:"help-modal",show:e.show,onHide:e.onClose,children:[Object(y.jsx)(z.a.Header,{className:"border-0",closeButton:!0}),Object(y.jsxs)(z.a.Body,{children:[Object(y.jsxs)("section",{className:"border-bottom",children:[Object(y.jsxs)("p",{children:["6\ubc88\uc758 \uc2dc\ub3c4 \uc548\uc5d0 ",Object(y.jsx)("b",{children:"\ub2e8\uc5b4"}),"\ub97c \ub9de\ucdb0\ubcf4\uc138\uc694."]}),Object(y.jsx)("p",{children:"\ub2e8\uc5b4\ub294 5\uae00\uc790\ub85c \uc774\ub8e8\uc5b4\uc9c4 \uc720\ud6a8\ud55c \ub2e8\uc5b4\uc785\ub2c8\ub2e4. 'ENTER' \ubc84\ud2bc\uc744 \ub20c\ub7ec \uc81c\ucd9c\ud558\uc138\uc694."}),Object(y.jsx)("p",{children:"\uc81c\ucd9c \ud6c4\uc5d0 \uae00\uc790 \ud0c0\uc77c\uc758 \uc0c9\uc0c1\uc774 \ubcc0\uacbd\ub418\uc5b4, \ucd94\uce21\uc774 \ub2e8\uc5b4\uc5d0 \uc5bc\ub9c8\ub098 \uac00\uae4c\uc6e0\ub294\uc9c0 \ubcf4\uc5ec\uc90d\ub2c8\ub2e4."})]}),Object(y.jsxs)("section",{className:"examples border-bottom",children:[Object(y.jsx)("p",{children:Object(y.jsx)("b",{children:"\uc608\uc2dc"})}),Object(y.jsxs)("div",{className:"items",children:[Object(y.jsx)("div",{className:"item letter s rotate",children:"\u3145"}),Object(y.jsx)("div",{className:"item letter",children:"\u314f"}),Object(y.jsx)("div",{className:"item letter",children:"\u3139"}),Object(y.jsx)("div",{className:"item letter",children:"\u314f"}),Object(y.jsx)("div",{className:"item letter",children:"\u3147"})]}),Object(y.jsx)("p",{children:"'\u3145' \uae00\uc790\ub294 \ub2e8\uc5b4\uc5d0 \uc788\uace0, \uc815\ud655\ud55c \uc704\uce58\uc5d0 \uc788\uc2b5\ub2c8\ub2e4."}),Object(y.jsxs)("div",{className:"items",children:[Object(y.jsx)("div",{className:"item letter",children:"\u3131"}),Object(y.jsx)("div",{className:"item letter",children:"\u314f"}),Object(y.jsx)("div",{className:"item letter b rotate",children:"\u3141"}),Object(y.jsx)("div",{className:"item letter",children:"\u3145"}),Object(y.jsx)("div",{className:"item letter",children:"\u314f"})]}),Object(y.jsx)("p",{children:"'\u3141' \uae00\uc790\ub294 \ub2e8\uc5b4\uc5d0\ub294 \uc788\uc9c0\ub9cc \uc798\ubabb\ub41c \uc704\uce58\uc5d0 \uc788\uc2b5\ub2c8\ub2e4."}),Object(y.jsxs)("div",{className:"items",children:[Object(y.jsx)("div",{className:"item letter",children:"\u3147"}),Object(y.jsx)("div",{className:"item letter",children:"\u3155"}),Object(y.jsx)("div",{className:"item letter",children:"\u3139"}),Object(y.jsx)("div",{className:"item letter o rotate",children:"\u3161"}),Object(y.jsx)("div",{className:"item letter",children:"\u3141"})]}),Object(y.jsx)("p",{children:"'\u3161' \uae00\uc790\ub294 \ub2e8\uc5b4\uc5d0 \uc5c6\uc2b5\ub2c8\ub2e4."})]}),Object(y.jsxs)("section",{children:[Object(y.jsx)("p",{children:Object(y.jsx)("strong",{children:"\ub9e4\uc77c 2\ubc88(0\uc2dc, 12\uc2dc) \uc0c8\ub85c\uc6b4 \uac8c\uc784\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."})}),Object(y.jsx)("p",{children:Object(y.jsxs)("small",{children:["(\uc774 \ud504\ub85c\uc81d\ud2b8\ub294\xa0",Object(y.jsx)("a",{href:"https://www.powerlanguage.co.uk/wordle/",target:"_blank",children:"WORDLE"}),"\uc744 \ud55c\uae00\ubc84\uc804\uc73c\ub85c \ub9cc\ub4e4\uc5b4 \ubcf8 \ud1a0\uc774\ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4.)"]})})]})]})]})}),K={currentStreak:0,maxStreak:0,success:{},fail:0},P=function(){var e=localStorage.getItem("statisticsData");return e?JSON.parse(e):(localStorage.setItem("statisticsData",JSON.stringify(K)),N.a.cloneDeep(K))},Y=function(e){localStorage.setItem("statisticsData",JSON.stringify(e))},_=c(74),G=c.n(_),W=c(26),X=c.n(W),q=c(131),Q=c(132),U=(c(115),function(e){var t=Object(a.useState)(K),c=Object(m.a)(t,2),s=c[0],n=c[1],r=Object(a.useState)(!1),i=Object(m.a)(r,2),o=i[0],j=i[1],d=Object(a.useState)(""),b=Object(m.a)(d,2),O=b[0],h=b[1],f=Object(a.useState)(null),x=Object(m.a)(f,2),v=x[0],p=x[1],k=Object(a.useState)(-1),N=Object(m.a)(k,2),g=N[0],S=N[1];Object(a.useEffect)((function(){if(e.show){var t=P();n(t);var c=I();if(S(c.checks.indexOf("sssss")),j("FINISH"===c.state),"FINISH"===c.state){var a=setInterval((function(){var e=X()(),t=X()();t=e.get("h")<12?X()().hour(12).startOf("h"):X()().add("d",1).startOf("d");var c=Math.floor(X.a.duration(t.diff(e)).asHours()),a=Math.floor(X.a.duration(t.diff(e)).asMinutes()%60),s=Math.floor(X.a.duration(t.diff(e)).asSeconds()%60);h("".concat(c.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"),":").concat(s.toString().padStart(2,"0")))}),1e3);p(a)}}else clearInterval(v)}),[e.show]);var w=Object(a.useMemo)((function(){return Object.values(s.success).reduce((function(e,t){return e+t}),0)}),[s]),C=Object(a.useMemo)((function(){return s.fail+w}),[s]),M=Object(a.useMemo)((function(){return 0===C?0:Math.round(w/C*100)}),[s]),D=Object(a.useMemo)((function(){return Math.max.apply(Math,Object(u.a)(Object.values(s.success)))}),[s]);return Object(y.jsxs)(z.a,{className:"statistics-modal",show:e.show,onHide:e.onClose,children:[Object(y.jsx)(z.a.Header,{className:"border-0",closeButton:!0}),Object(y.jsxs)(z.a.Body,{children:[Object(y.jsxs)("section",{children:[Object(y.jsx)("h2",{children:"\ud1b5\uacc4"}),Object(y.jsxs)("div",{className:"summary",children:[Object(y.jsxs)("div",{className:"summary-item",children:[Object(y.jsx)("div",{className:"value",children:C}),Object(y.jsx)("div",{className:"title",children:"\uac8c\uc784"})]}),Object(y.jsxs)("div",{className:"summary-item",children:[Object(y.jsx)("div",{className:"value",children:M}),Object(y.jsx)("div",{className:"title",children:"\uc2b9\ub960(%)"})]}),Object(y.jsxs)("div",{className:"summary-item",children:[Object(y.jsx)("div",{className:"value",children:s.currentStreak}),Object(y.jsx)("div",{className:"title",children:"\ud604\uc7ac \uc5f0\uc2b9"})]}),Object(y.jsxs)("div",{className:"summary-item",children:[Object(y.jsx)("div",{className:"value",children:s.maxStreak}),Object(y.jsx)("div",{className:"title",children:"\ucd5c\uace0 \uc5f0\uc2b9"})]})]})]}),Object(y.jsxs)("section",{children:[Object(y.jsx)("h2",{children:"\uc815\ub2f5 \ubd84\ud3ec"}),Object(y.jsx)("div",{className:"guess-distribution",children:Array(6).fill(0).map((function(e,t){var c;return Object(y.jsxs)("div",{className:"guess-distribution-item",children:[Object(y.jsx)("span",{children:t+1}),Object(y.jsx)(q.a,{className:l()({last:t===g}),now:s.success[t]/D*100,label:null!==(c=s.success[t])&&void 0!==c?c:0})]},t)}))})]}),o&&Object(y.jsx)("section",{children:Object(y.jsxs)("div",{className:"bottom",children:[Object(y.jsxs)("div",{className:"border-right",children:[Object(y.jsx)("h2",{children:"\ub2e4\uc74c \uc6cc\ub4e4\uae4c\uc9c0"}),Object(y.jsxs)("div",{className:"next-time",children:["\xa0",O,"\xa0"]})]}),Object(y.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:Object(y.jsxs)(Q.a,{className:"share-btn",size:"lg",onClick:e.onClickShare,children:["\uacf5\uc720 ",Object(y.jsx)(G.a,{})]})})]})})]})]})}),V=function(){var e=Object(a.useState)(0),t=Object(m.a)(e,2),c=t[0],s=t[1],n=Object(a.useState)(["","","","","",""]),r=Object(m.a)(n,2),i=r[0],l=r[1],o=Object(a.useState)(["","","","","",""]),j=Object(m.a)(o,2),O=j[0],f=j[1],v=Object(a.useState)({}),k=Object(m.a)(v,2),w=k[0],L=k[1],T=Object(a.useState)(!1),E=Object(m.a)(T,2),H=E[0],F=E[1],B=Object(a.useState)(!1),z=Object(m.a)(B,2),K=z[0],_=z[1],G=Object(a.useState)(!0),W=Object(m.a)(G,2),X=W[0],q=W[1],Q=Object(a.useState)(!1),V=Object(m.a)(Q,2),Z=V[0],$=V[1],ee=Object(a.useState)(!1),te=Object(m.a)(ee,2),ce=te[0],ae=te[1];Object(a.useEffect)((function(){se()}),[]);var se=function(){var e=Object(b.a)(h.a.mark((function e(){var t,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _(!0),e.next=3,x.a.get("https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle");case 3:t=e.sent,0===(c=I()).id&&ae(!0),c.id===t.data.id?(re(c),"FINISH"===c.state&&(q(!1),setTimeout((function(){$(!0)}),1e3))):ne(t.data.id),_(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(e){var t=N.a.cloneDeep(M);t.id=e,D(t),re(t),q(!0)},re=function(e){s(Math.min(5,e.curRow)),l(Object(u.a)(e.letters)),f(Object(u.a)(e.checks)),L(Object(d.a)({},e.keyMap))},ie=function(e,t){var c=N.a.cloneDeep(w);return e.split("").forEach((function(e,a){"s"===t[a]?c[e]="s":"b"===t[a]?"s"!==c[e]&&(c[e]="b"):void 0===c[e]&&(c[e]="o")})),c},le=function(){var e=Object(b.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(X){e.next=2;break}return e.abrupt("return");case 2:if(5!==i[c].length){e.next=15;break}if(t=p.a.assemble(i[c].split("")),!t.split("").every((function(e){return p.a.isComplete(e)}))){e.next=12;break}return e.delegateYield(h.a.mark((function e(){var a,n,r,l,o,j,d;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _(!0),q(!1),e.next=4,x.a.get("https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle?word=".concat(t,"&letters=").concat(i[c]));case 4:if(a=e.sent,_(!1),!a.data.error){e.next=12;break}return Object(S.b)({text:a.data.error,variant:"dark"}),F(!0),setTimeout((function(){F(!1)}),200),q(!0),e.abrupt("return",{v:void 0});case 12:if(n=I(),a.data.id===n.id){e.next=17;break}return Object(S.b)({text:"\uac8c\uc784\uc774 \uc5c5\ub370\uc774\ud2b8 \ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc0c8\ub85c\uc6b4 \uac8c\uc784\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4.",variant:"dark"}),ne(a.data.id),e.abrupt("return",{v:void 0});case 17:for(n.curRow=c+1,n.letters[c]=a.data.letters,n.checks[c]=a.data.check,n.keyMap=N.a.cloneDeep(ie(a.data.letters,a.data.check)),D(n),"sssss"===a.data.check?((l=P()).currentStreak+=1,l.maxStreak=Math.max(l.maxStreak,l.currentStreak),l.success[c]=(null!==(r=l.success[c])&&void 0!==r?r:0)+1,Y(l),n.curRow=c,n.state="FINISH",D(n)):5===c&&((o=P()).currentStreak=0,o.fail+=1,Y(o),n.curRow=c,n.state="FINISH",D(n)),j=function(e){setTimeout((function(){var t,s=N.a.cloneDeep(O);s[c]=(null!==(t=a.data.check)&&void 0!==t?t:"").slice(0,e+1),f(s)}),300*e)},d=0;d<5;++d)j(d);setTimeout((function(){var e,t=N.a.cloneDeep(w);if(null===(e=a.data.letters)||void 0===e||e.split("").forEach((function(e,c){var s,n;"s"===(null!==(s=a.data.check)&&void 0!==s?s:[])[c]?t[e]="s":"b"===(null!==(n=a.data.check)&&void 0!==n?n:[])[c]?"s"!==t[e]&&(t[e]="b"):void 0===t[e]&&(t[e]="o")})),L(t),"sssss"===a.data.check){Object(S.b)({text:["\ucc9c\uc7ac!!!","\uad49\uc7a5\ud574\uc694!!!","\uc815\ub9d0 \uc798\ud588\uc5b4\uc694!!","\uba4b\uc838\uc694!","\uc798\ud588\uc5b4\uc694!!","\uaca8\uc6b0 \ub9de\ucdc4\ub124\uc694!"][c],variant:"dark"}),setTimeout((function(){$(!0)}),2e3)}else 5===c?(Object(S.b)({text:"\ub2e4\uc74c \uae30\ud68c\uc5d0 \ub2e4\uc2dc \ub3c4\uc804\ud574\ubcf4\uc138\uc694",variant:"dark"}),setTimeout((function(){$(!0)}),2e3)):(s((function(e){return e+1})),q(!0))}),1500);case 26:case"end":return e.stop()}}),e)}))(),"t0",7);case 7:if("object"!==typeof(a=e.t0)){e.next=10;break}return e.abrupt("return",a.v);case 10:e.next=15;break;case 12:Object(S.b)({text:"\ub2e8\uc5b4 \ubaa9\ub85d\uc5d0 \uc5c6\uc2b5\ub2c8\ub2e4.",variant:"dark"}),F(!0),setTimeout((function(){F(!1)}),200);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(y.jsxs)("div",{className:"game",children:[Object(y.jsx)(R,{onClickStatistics:function(){return $(!0)},onClickHowTo:function(){return ae(!0)}}),Object(y.jsx)(C,{curRow:c,lettersList:i,checkList:O,shake:H}),Object(y.jsx)(J,{curLetters:i[c],onClickKeyboard:function(e){if(X&&i[c].length<5){var t=N.a.cloneDeep(i);t[c]+=e,l(t)}},onClickEner:le,onClickBack:function(){if(X&&0<i[c].length){var e=N.a.cloneDeep(i);e[c]=e[c].slice(0,-1),l(e)}},keyMap:w}),Object(y.jsx)(S.a,{options:{position:"top",delay:2e3}}),K&&Object(y.jsx)("div",{className:"loading",children:Object(y.jsx)(g.a,{animation:"border"})}),Object(y.jsx)(U,{show:Z,onClose:function(){return $(!1)},onClickShare:function(){var e=I(),t="\uc6cc\ub4e4 ".concat(e.id," ").concat(e.checks.some((function(e){return"sssss"===e}))?e.checks.filter((function(e){return e})).length:"X","/").concat(e.checks.length,"\n\n");t+=e.checks.filter((function(e){return""!==e})).map((function(e){return e.split("").reduce((function(e,t){return e+("s"===t?"\ud83d\udfe9":"b"===t?"\ud83d\udfe8":"\u2b1c")}),"")})).join("\n"),navigator.share?navigator.share({text:t}):(navigator.clipboard.writeText(t),Object(S.b)({text:"\uac8c\uc784 \uacb0\uacfc\ub97c \ud074\ub9bd\ubcf4\ub4dc\uc5d0 \ubcf5\uc0ac\ud588\uc2b5\ub2c8\ub2e4.",variant:"dark"}))}}),Object(y.jsx)(A,{show:ce,onClose:function(){return ae(!1)}})]})};var Z=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsx)("div",{className:l()("mobile-container"),children:Object(y.jsx)(o.a,{children:Object(y.jsx)(j.a,{path:"/",component:V})})})})},$=(c(119),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,133)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),a(e),s(e),n(e),r(e)}))});r.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(Z,{})}),document.getElementById("root")),$()},82:function(e,t,c){}},[[121,1,2]]]);