import{b as J,c as Y}from"./chunk-G5XIJ2EH.js";import{a as X}from"./chunk-Q2D4LDD6.js";import"./chunk-DX4FTDQR.js";import{b as R,e as L,h as q,j as Q}from"./chunk-X4VVONUQ.js";import{i as j,l as N,m as B,n as b}from"./chunk-6KEO6D2E.js";import{Db as f,Hb as h,Ib as c,Qb as s,Ra as T,Rb as m,Ta as a,Ub as F,V as M,Wb as x,Xb as v,Yb as y,cb as P,da as O,fb as E,i as S,ib as _,ja as p,ka as g,pb as I,qb as u,rb as z,sb as w,ua as U,ub as C,vb as A,wb as $,xb as o,yb as r,zb as l}from"./chunk-X3WKPGPN.js";var D=class t{transform(n){if(!n)return"";let e=n.replace(/\D/g,"");return e.length!==11?n:e.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}static \u0275fac=function(e){return new(e||t)};static \u0275pipe=E({name:"cpfMask",type:t,pure:!0})};function Z(t,n){if(t&1&&(o(0,"div",7)(1,"h2"),s(2),r(),o(3,"p"),s(4,"N\xAA DA MATR\xCDCULA"),r()()),t&2){let e=c();a(2),m(e.cardDataUser==null?null:e.cardDataUser.matricula)}}function ee(t,n){if(t&1&&(o(0,"div",8),l(1,"img",14),r()),t&2){let e=c();a(),u("src",e.apiUrlImg+(e.cardDataUser==null?null:e.cardDataUser.photo),T)}}function te(t,n){if(t&1&&(o(0,"h2"),s(1),x(2,"date"),r(),o(3,"p"),s(4,"DATA DE NASCIMENTO"),r()),t&2){let e=c();a(),m(y(2,1,e.cardDataUser==null?null:e.cardDataUser.birthDay,"dd/MM/yyyy"))}}function ne(t,n){if(t&1&&(o(0,"h2"),s(1),x(2,"date"),r(),o(3,"p"),s(4,"DATA DE NASCIMENTO"),r()),t&2){let e=c();a(),m(y(2,1,e.cardDataUser==null?null:e.cardDataUser.birthDate,"dd/MM/yyyy"))}}function ie(t,n){if(t&1&&(o(0,"h2"),s(1),x(2,"date"),r(),o(3,"p"),s(4,"ASSOCIADO DESDE"),r()),t&2){let e=c();a(),m(y(2,1,e.cardDataUser==null?null:e.cardDataUser.createdAt,"dd/MM/yyyy"))}}var k=class t{cardData=U();cardDataUser;userData=JSON.parse(localStorage.getItem("userData"));apiUrlImg=X;ngOnInit(){this.setCardData()}setCardData(){this.cardDataUser=this.cardData()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=P({type:t,selectors:[["app-user-card"]],inputs:{cardData:[1,"cardData"]},decls:26,vars:8,consts:[[1,"user-card"],[1,"card-header"],[1,"user-name"],[1,"qr-code"],["src","/img/qrTeste.png","alt","QR Code"],[1,"card-body"],[1,"code-photo"],[1,"registration-code"],[1,"photo"],[1,"info"],[1,"cpf"],[1,"date"],[1,"registration-date"],["src","/img/white-logo.png","alt","Logo",1,"logo"],["alt","Foto do Associado",3,"src"]],template:function(e,i){e&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),s(4),r(),o(5,"p"),s(6,"NOME DO ASSOCIADO"),r()(),o(7,"div",3),l(8,"img",4),r()(),o(9,"div",5)(10,"div",6),_(11,Z,5,1,"div",7)(12,ee,2,1,"div",8),r(),o(13,"div",9)(14,"div",10)(15,"h2"),s(16),x(17,"cpfMask"),r(),o(18,"p"),s(19,"CPF"),r()(),o(20,"div",11),_(21,te,5,4)(22,ne,5,4),r(),o(23,"div",12),_(24,ie,5,4),r()()(),l(25,"img",13),r()),e&2&&(a(4),m(i.cardDataUser==null?null:i.cardDataUser.name),a(7),C(i.cardDataUser!=null&&i.cardDataUser.matricula?11:-1),a(),C(i.cardDataUser!=null&&i.cardDataUser.photo?12:-1),a(4),m(v(17,6,i.cardDataUser==null?null:i.cardDataUser.cpf)),a(5),C(i.cardDataUser!=null&&i.cardDataUser.birthDay?21:i.cardDataUser!=null&&i.cardDataUser.birthDate?22:-1),a(3),C(i.cardDataUser!=null&&i.cardDataUser.createdAt?24:-1))},dependencies:[b,B,D],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;width:max-content;min-width:480px;padding:10px;height:100%}.user-card[_ngcontent-%COMP%]{border:1px solid #ccc;border-radius:8px;max-width:440px;height:270px;padding:16px;background:url(/img/background.png) no-repeat center;background-size:cover;position:relative;display:flex;align-items:center;justify-content:space-between;flex-direction:column;flex:0 0 125%}.user-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-weight:800}.user-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:space-between;text-align:center;position:relative}.user-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{width:max-content;font-size:25px;font-weight:700;margin:0}.user-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:max-content;font-size:12px;color:#666;margin:0}.user-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .qr-code[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:45px;height:45px}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{display:flex;align-items:flex-start;width:100%;height:100%;margin-top:10px}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;width:50%;height:100%}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]   .registration-code[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]   .registration-code[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:600}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]   .registration-code[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:12px}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]   .photo[_ngcontent-%COMP%]{width:120px;display:flex;justify-content:center;height:140px;align-items:center;background:#cecece;border:1px solid white;margin-top:10px}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .code-photo[_ngcontent-%COMP%]   .photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{margin-left:35px}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:600}.user-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:12px}.user-card[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{position:absolute;bottom:30px;width:100px}@media only screen and (max-width: 500px){.user-card[_ngcontent-%COMP%]{rotate:90deg}}']})};var oe=()=>["/perfil"],re=(t,n)=>n.id;function ae(t,n){if(t&1){let e=f();o(0,"div",14),h("click",function(){p(e);let d=c(3);return g(d.navigateCarousel(-1))})("keydown.enter",function(){p(e);let d=c(3);return g(d.navigateCarousel(-1))}),l(1,"i",15),r()}}function ce(t,n){if(t&1){let e=f();o(0,"div",16),h("click",function(){p(e);let d=c(3);return g(d.navigateCarousel(-1))})("keydown.enter",function(){p(e);let d=c(3);return g(d.navigateCarousel(-1))}),l(1,"i",17),r()}}function de(t,n){if(t&1&&(o(0,"div",18),l(1,"app-user-card",19),r()),t&2){let e=n.$implicit,i=n.index;I("tabindex",i+1),a(),u("cardData",e)}}function se(t,n){if(t&1){let e=f();o(0,"div",20),h("click",function(){p(e);let d=c(3);return g(d.navigateCarousel(1))})("keydown.enter",function(){p(e);let d=c(3);return g(d.navigateCarousel(1))}),l(1,"i",21),r()}}function le(t,n){if(t&1){let e=f();o(0,"div",22),h("click",function(){p(e);let d=c(3);return g(d.navigateCarousel(1))})("keydown.enter",function(){p(e);let d=c(3);return g(d.navigateCarousel(1))}),l(1,"i",23),r()}}function _e(t,n){if(t&1){let e=f();o(0,"span",24),h("click",function(){let d=p(e).index,V=c(3);return g(V.setCurrentCard(d))})("keydown.enter",function(){let d=p(e).index,V=c(3);return g(V.setCurrentCard(d))}),r()}if(t&2){let e=n.index,i=c(3);w("active",e===i.currentCardIndex)}}function Ce(t,n){if(t&1&&(o(0,"div",4),_(1,ae,2,0,"div",5)(2,ce,2,0,"div",6),o(3,"div",7)(4,"div",8),_(5,de,2,2,"div",9),r()(),_(6,se,2,0,"div",10)(7,le,2,0,"div",11),o(8,"div",12),_(9,_e,1,2,"span",13),r()()),t&2){let e=c(2);w("horizontal",!e.isVertical()),a(),C(e.isVertical()?1:-1),a(),C(e.isVertical()?-1:2),a(2),z("transform",e.getTransformStyle()),a(),u("ngForOf",e.userCards),a(),C(e.isVertical()?6:-1),a(),C(e.isVertical()?-1:7),a(),w("horizontal",!e.isVertical()),a(),u("ngForOf",e.userCards)}}function pe(t,n){if(t&1&&l(0,"app-user-card",19),t&2){let e=n.$implicit;u("cardData",e)}}function ge(t,n){if(t&1&&A(0,pe,1,1,"app-user-card",19,re),t&2){let e=c(2);$(e.userCards)}}function ue(t,n){if(t&1&&_(0,Ce,10,12,"div",3)(1,ge,2,0),t&2){let e=c();C(e.userCards.length>1?0:1)}}function me(t,n){t&1&&(o(0,"div",2),l(1,"i",25),o(2,"h2"),s(3,"Complete suas informa\xE7\xF5es de cadastro para ter acesso ao cart\xE3o"),r(),o(4,"div",26)(5,"button",27),s(6,"Terminar cadastro"),r()()()),t&2&&(a(5),u("routerLink",F(1,oe)))}var H=class t{breakpoint=O(J);dataService=O(Q);route=O(R);routeService=O(Y);UserData=JSON.parse(localStorage.getItem("userData"));userCards=[];carouselDirection="horizontal";currentCardIndex=0;destroy$=new S;acessToCard$=this.routeService.getUserDataStatus();ngOnInit(){this.breakpoint.getScreenInfo().pipe(M(this.destroy$)).subscribe(n=>{n.breakpoints["(max-width: 959.98px) and (orientation: landscape)"]?this.carouselDirection="horizontal":n.matches?this.carouselDirection="vertical":this.carouselDirection="horizontal"}),this.getCardsData()}getCardsData(){this.dataService.getCardsData(this.UserData.id).pipe(M(this.destroy$)).subscribe(n=>{this.userCards=n,this.route.params.pipe(M(this.destroy$)).subscribe(e=>{let i=e.id;i&&this.isVertical()&&(this.userCards=[],this.userCards.push(n[i]))})})}navigateCarousel(n){let e=this.currentCardIndex+n;e>=0&&e<this.userCards.length&&(this.currentCardIndex=e)}setCurrentCard(n){n>=0&&n<this.userCards.length&&(this.currentCardIndex=n,console.log(n))}getTransformStyle(){return this.carouselDirection==="vertical"?`translateY(${-this.currentCardIndex*100}%)`:`translateX(${-this.currentCardIndex*100}%)`}isVertical(){return this.carouselDirection==="vertical"}ngOnDestroy(){this.destroy$.next(""),this.destroy$.complete()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=P({type:t,selectors:[["app-card-view"]],decls:7,vars:3,consts:[[1,"title"],[1,"address","card","icon"],[1,"warning-card"],[1,"carousel-container",3,"horizontal"],[1,"carousel-container"],["tabindex","0",1,"carousel-arrow","up"],["tabindex","0",1,"carousel-arrow","left"],[1,"carousel-content"],[1,"carousel-slide"],["class","carousel-item",4,"ngFor","ngForOf"],["tabindex","0",1,"carousel-arrow","down"],["tabindex","0",1,"carousel-arrow","right"],[1,"carousel-indicators"],["class","indicator","tabindex","0",3,"active","click","keydown.enter",4,"ngFor","ngForOf"],["tabindex","0",1,"carousel-arrow","up",3,"click","keydown.enter"],[1,"angle","up","icon"],["tabindex","0",1,"carousel-arrow","left",3,"click","keydown.enter"],[1,"angle","left","icon"],[1,"carousel-item"],[3,"cardData"],["tabindex","0",1,"carousel-arrow","down",3,"click","keydown.enter"],[1,"angle","down","icon"],["tabindex","0",1,"carousel-arrow","right",3,"click","keydown.enter"],[1,"angle","right","icon"],["tabindex","0",1,"indicator",3,"click","keydown.enter"],[1,"lock","icon"],[1,"container-button"],[1,"ui","button","primary",3,"routerLink"]],template:function(e,i){e&1&&(o(0,"div",0),l(1,"i",1),o(2,"h2"),s(3,"Meu Cart\xE3o"),r()(),_(4,ue,2,1),x(5,"async"),_(6,me,7,2,"div",2)),e&2&&(a(4),C(v(5,1,i.acessToCard$)?4:6))},dependencies:[b,j,N,k,q,L],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding-top:20px;height:100%;width:100%}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;font-size:80px;color:#0045b7}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:40px;font-weight:300}[_nghost-%COMP%]   .direction-toggle[_ngcontent-%COMP%]{margin:20px 0}[_nghost-%COMP%]   .direction-toggle[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%]{padding:8px 16px;background:#0045b7;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px;transition:background-color .3s}[_nghost-%COMP%]   .direction-toggle[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%]:hover{background:#003490}[_nghost-%COMP%]   .direction-toggle[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #0045b780}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:500px;height:70vh;position:relative}[_nghost-%COMP%]   .carousel-container.horizontal[_ngcontent-%COMP%]{flex-direction:row;max-width:80%;height:400px}[_nghost-%COMP%]   .carousel-container.horizontal[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]{height:100%;width:80%}[_nghost-%COMP%]   .carousel-container.horizontal[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]   .carousel-slide[_ngcontent-%COMP%]{flex-direction:row}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:40px;height:40px;border-radius:50%;background-color:#f5f5f5;cursor:pointer;margin:10px 0;transition:background-color .3s;z-index:2}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow.left[_ngcontent-%COMP%], [_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow.right[_ngcontent-%COMP%]{margin:0 10px}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#000;font-size:20px}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-arrow[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #0045b780}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]{width:100%;height:450px;overflow:hidden;position:relative}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]   .carousel-slide[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;height:100%;transition:transform .5s ease}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]   .carousel-slide[_ngcontent-%COMP%]   .carousel-item[_ngcontent-%COMP%]{flex:0 0 100%;height:100%;width:100%;display:flex;justify-content:center;align-items:center}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-content[_ngcontent-%COMP%]   .carousel-slide[_ngcontent-%COMP%]   .carousel-item[_ngcontent-%COMP%]:focus{outline:none}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:absolute;left:20px;top:50%;transform:translateY(-50%)}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators.horizontal[_ngcontent-%COMP%]{flex-direction:row;inset:auto auto 10px 50%;transform:translate(-50%)}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators.horizontal[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]{margin:0 5px}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;background-color:#ddd;margin:5px 0;cursor:pointer;transition:background-color .3s}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .indicator.active[_ngcontent-%COMP%]{background-color:#000}[_nghost-%COMP%]   .carousel-container[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #0045b780}@media only screen and (max-width: 1280px){.title[_ngcontent-%COMP%]{display:none!important}}@media only screen and (max-height: 680px){.carousel-container[_ngcontent-%COMP%]{height:90vh!important}}.warning-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;border-radius:10px;background:#8080803d;box-shadow:#00000085;padding:10px;width:100%;max-width:500px}.warning-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;font-size:50px;color:#0045b7}.warning-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center;font-weight:400}"]})};export{H as CardViewComponent};
