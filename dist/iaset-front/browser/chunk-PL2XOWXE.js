import{e as $,h as F,j as P}from"./chunk-X4VVONUQ.js";import{l as k,n as w}from"./chunk-6KEO6D2E.js";import{Db as v,Hb as S,Ib as E,Qb as a,Rb as s,Ta as r,V as u,Vb as O,Wb as L,Xb as M,cb as D,da as _,i as m,ib as C,ja as f,ka as h,q as c,qb as g,ub as b,vb as y,wb as x,xb as o,yb as n,zb as p}from"./chunk-X3WKPGPN.js";var N=t=>["/dependente",t],R=(t,i)=>i.id;function V(t,i){if(t&1){let e=v();o(0,"tr")(1,"td"),a(2),n(),o(3,"td"),a(4),n(),o(5,"td",1)(6,"button",2),p(7,"i",3),a(8," Editar "),n(),o(9,"button",4),S("click",function(){let d=f(e).$implicit,I=E(2);return h(I.deleteDependent(d.id))}),p(10,"i",5),a(11," Deletar "),n()()()}if(t&2){let e=i.$implicit;r(2),s(e.name),r(2),s(e.relationship=="filho"?"Filho(a)":"C\xF4njuge"),r(2),g("routerLink",O(3,N,e.id))}}function j(t,i){t&1&&(o(0,"tr")(1,"td",6)(2,"h2",7),a(3,"Sem dependentes cadastrados"),n()()())}function U(t,i){t&1&&(o(0,"table",0)(1,"thead")(2,"tr")(3,"th"),a(4,"Nome"),n(),o(5,"th"),a(6,"Rela\xE7\xE3o"),n(),p(7,"th",1),n()(),o(8,"tbody"),y(9,V,12,5,"tr",null,R,!1,j,4,0,"tr"),n()()),t&2&&(r(9),x(i))}var T=class t{dataService=_(P);userData=JSON.parse(localStorage.getItem("userData"));destroy$=new m;listDependents$=this.dataService.getDependents(this.userData.id).pipe(u(this.destroy$));deleteDependent(i){c(this.dataService.deleteDependent(this.userData.id,i)).then(e=>{console.log(e)}).catch(e=>{throw e})}ngOnDestroy(){this.destroy$.next(""),this.destroy$.complete()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=D({type:t,selectors:[["app-lista-dependente"]],decls:3,vars:3,consts:[[1,"ui","inverted","blue","table"],[1,"right","aligned"],[1,"ui","icon","button","primary",3,"routerLink"],[1,"edit","icon"],[1,"ui","icon","button","primary",3,"click"],[1,"trash","icon"],[1,"center","aligned"],[1,"empty"]],template:function(e,l){if(e&1&&(o(0,"section"),C(1,U,12,1,"table",0),L(2,"async"),n()),e&2){let d;r(),b((d=M(2,1,l.listDependents$))?1:-1,d)}},dependencies:[w,k,F,$],styles:["[_nghost-%COMP%]{border-radius:10px;display:flex;width:100%;height:100%;background:linear-gradient(to bottom,#008cb7d7,#97bad6d7);padding:10px}[_nghost-%COMP%]   section[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   section[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]{font-size:16px;font-weight:400}"]})};export{T as ListaDependenteComponent};
