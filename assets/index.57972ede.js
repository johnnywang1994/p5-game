import{r as e,p as t,o,a as i,b as s,c as n,d as r,e as a,f as l,w as d,t as c,n as u,g as h,h as g,F as m,i as b,v as p,j as y,k as w,l as v,m as f}from"./vendor.23c6fc5d.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const i=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const r=new URL(e,i);if(self[t].moduleMap[r])return o(self[t].moduleMap[r]);const a=new Blob([`import * as m from '${r}';`,`${t}.moduleMap['${r}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(a),onerror(){n(new Error(`Failed to import: ${e}`)),s(l)},onload(){o(self[t].moduleMap[r]),s(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("assets/");let x,k,C,I,S;const R={name:"ShootVirus",setup(){let s;const n=e(localStorage.getItem("[shoot-virus]-bestScore")||0),r=e(!1),a=e(!1),l=e(null),d=e(0),c=e(3),{initCanvas:u,addProcess:h,startAnimate:g}=t.useP5({animateState:!1,width:window.innerWidth>576?500:window.innerWidth-30,height:window.innerHeight>400?400:window.innerHeight,bgColor:0,on:{mouseClicked(e,t,o){a.value||k.create(t.mouseX,t.mouseY)},preload(){}}}),m=()=>{d.value+=1},b=()=>{c.value-=1,c.value<=0&&(localStorage.setItem("[shoot-virus]-bestScore",`${d.value}`),n.value=d.value,d.value=0,c.value=3,s.noLoop(),C.render=!1,I.render=!0,x.items=[],x.create())},p=()=>{a.value=!0,s.noLoop()};return o((()=>{!function({paused:e,addPoint:o,costLife:i}){x=t.createProcess({draw(e,{width:t,height:o}){const{items:s}=this,n=(t-80)/2,r=(t-80)/2+80,a=o-100;for(let l=0;l<s.length;l++){const d=s[l],{position:c}=d;d.run(),(c.x<0||c.x>t||c.y>o)&&(d.position.set(e.random(t),-30),d.options.opacity=e.random(1)),c.x>n&&c.x<r&&c.y>a&&(d.position.set(e.random(t),-30),i())}},on:{preload(e,t){this.virusImg=t.loadImage("./cdn/virus.png")},mouseClicked(t,i,{width:s}){const{items:n}=this;if(!e.value)for(let e=0;e<n.length;e++){const{position:t,options:r}=n[e],{radius:a}=r,l=i.dist(i.mouseX,i.mouseY,t.x,t.y);a&&l<a&&(t.x=i.random(s),t.y=0,o())}}}}),x.addMethod("create",(function(e,{width:o,height:i}){const s=this;s.items=[];for(let n=0;n<15;n++){const i=t.createParticle(e,{position:{x:e.random(o),y:-30},speed:{x:e.random(-.3,.3),y:e.random(.3,2)},rotateSpeed:e.random(-1,1),angle:0,radius:14,image:s.virusImg});s.items.push(i)}})),k=t.createProcess({draw(e){const{items:t}=this;if(!(t.length<=0))for(let o=0;o<t.length;o++)t[o].run()}}),k.addMethod("create",(function(e,o,i,s){const n=this;n.items||(n.items=[]);const{items:r}=n;for(let a=0;a<15;a++){const o=t.createParticle(e,{position:{x:i,y:s},speed:{x:e.random(-1,1),y:e.random(-1,1)},radius:2,life:e.random(60)});o.onDead=()=>{r.splice(r.indexOf(o),1)},r.push(o)}})),C=t.createProcess({on:{preload(e,t){this.babyImg=t.loadImage("./cdn/baby.png"),this.render=!0}},draw(e,{width:t,height:o}){if(this.babyImg&&this.render){try{this.babyImg.resize(80,0)}catch(i){window.location.reload()}e.imageMode(e.CENTER),e.image(this.babyImg,t/2,o-50),e.imageMode(e.CORNER)}}}),I=t.createProcess({on:{preload(e,t){this.deathImg=t.loadImage("./cdn/death.png"),this.render=!1}},draw(e,{width:t,height:o}){if(this.deathImg&&this.render){try{this.deathImg.resize(200,0)}catch(i){window.location.reload()}e.imageMode(e.CENTER),e.image(this.deathImg,t/2,200),e.imageMode(e.CORNER)}}}),S=t.createProcess({on:{preload(e,t){this.cursorImg=t.loadImage("./cdn/shoot_aim.png")}},draw(e){try{this.cursorImg.resize(32,0)}catch(t){window.location.reload()}e.imageMode(e.CENTER),e.image(this.cursorImg,e.mouseX,e.mouseY),e.imageMode(e.CORNER)}})}({paused:a,addPoint:m,costLife:b}),s=u(l.value),h(x,k,C,I,S),console.log(l)})),i((()=>{p()})),{initialized:r,paused:a,csRef:l,bestScore:n,point:d,userLife:c,startGame:()=>{r.value=!0,g(),x.create()},restartGame:()=>{a.value=!1,s.loop(),C.render=!0,I.render=!1},stopGame:p}}},B={class:"shoot-virus"},M=a("h1",{class:"text-2xl font-bold"}," P5-hook Shoot-Virus ",-1),P=g(" Return Home "),A={key:0},L={key:1},T={key:2},z={key:3};R.render=function(e,t,o,i,g,m){const b=s("router-link");return n(),r("div",B,[M,a("small",null,[l(b,{class:"text-blue-500",to:"/"},{default:d((()=>[P])),_:1})]),a("h3",null,"Best Score: "+c(i.bestScore),1),i.userLife>0?(n(),r("div",A,"You Points: "+c(i.point)+", Life: "+c(i.userLife),1)):(n(),r("div",L,"Game Over!!")),i.initialized?(n(),r("div",T,[a("button",{class:"bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md mr-2",onClick:t[0]||(t[0]=(...e)=>i.restartGame&&i.restartGame(...e))},"Restart"),a("button",{class:"bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md",onClick:t[1]||(t[1]=(...e)=>i.stopGame&&i.stopGame(...e))},"Pause")])):(n(),r("div",z,[a("button",{class:"bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md",onClick:t[2]||(t[2]=(...e)=>i.startGame&&i.startGame(...e))},"Start")])),a("div",{class:u(["vue-canvas",{paused:i.paused}]),ref:"csRef",onTouchmove:t[3]||(t[3]=h((()=>{}),["prevent"]))},null,34)])};var E=function(e){var t=e[0]/60,o=e[1]/100,i=e[2]/100,s=Math.floor(t)%6,n=t-Math.floor(t),r=255*i*(1-o),a=255*i*(1-o*n),l=255*i*(1-o*(1-n));switch(i*=255,s){case 0:return[i,l,r];case 1:return[a,i,r];case 2:return[r,i,l];case 3:return[r,a,i];case 4:return[l,r,i];case 5:return[i,r,a]}},F=function(e){var t,o,i=e[0],s=e[1]/100,n=e[2]/100;return t=s*n,[i,100*(t/=(o=(2-s)*n)<=1?o:2-o),100*(o/=2)]},_=function(e,t,o){return"#"+((256+e<<8|t)<<8|o).toString(16).slice(1)};let O=Math.random();function G(e,t){return O+=.618033988749895,O%=1,"number"!=typeof e&&(e=.5),"number"!=typeof t&&(t=.95),[360*O,100*e,100*t]}function j(){const e=G(),t=E(e);return _(t[0],t[1],t[2])}var H={color:function(){return j()},hex:j,rgb:function(){const e=G(),t=E(e);return"rgb("+parseInt(t[0],10)+", "+parseInt(t[1],10)+", "+parseInt(t[2],10)+")"},rgba:function(){const e=G(),t=E(e);return"rgba("+parseInt(t[0],10)+", "+parseInt(t[1],10)+", "+parseInt(t[2],10)+", "+Math.random().toFixed(2)+")"},hsl:function(){const e=G(),t=F(e);return"hsl("+parseInt(t[0],10)+", "+parseInt(t[1],10)+"%, "+parseInt(t[2],10)+"%)"},hsv:function(){const e=G();return"hsv("+parseInt(e[0],10)+", "+parseInt(e[1],10)+"%, "+parseInt(e[2],10)+"%)"}};let U,V,W;function N(e,t){const{position:o,size:i}=e,{position:s}=t;return s.x>=o.x&&s.x<=o.x+i.width&&s.y>=o.y&&s.y<=o.y+i.height}const Y={name:"BounceBall",setup(){let i;const s=e(localStorage.getItem("[shoot-virus]-bestScore")||0),n=e(!1),r=e(!1),a=e(null),l=e(0),d=e(3),{initCanvas:c,addProcess:u,startAnimate:h}=t.useP5({animateState:!1,width:window.innerWidth>576?500:window.innerWidth-30,height:window.innerHeight>400?400:window.innerHeight,bgColor:255,on:{setup(e){},keyPressed(){}}}),g=()=>{l.value+=1},m=()=>{r.value=!0,i.noLoop()},b=()=>{d.value-=1,d.value<=0&&m()};return o((()=>{!function({addPoint:e,costLife:o}){U=t.createProcess({setup(){this.waiting=!0},draw(e,{width:t,height:i}){const{position:s,velocity:n,options:r}=this.ball,a=s.x+r.radius/2+1>t||s.x-r.radius/2-1<0,l=s.y-r.radius/2-1<0;if(s.y>i)return o(),this.create(),void(this.waiting=!0);a?n.x=-n.x:l&&(n.y=-n.y),this.waiting?this.ball.display():this.ball.run()},on:{keyPressed({keyCode:e}){32===e&&this.waiting&&(this.waiting=!1)}}}),U.addMethod("create",(function(e,o){const{position:i,size:s}=V.paddle;this.ball=t.createParticle(e,{position:{x:i.x+s.width/2,y:o.height-30},speed:{x:4,y:-4},color:0,radius:16})})),V=t.createProcess({draw(e){const{position:t,size:o}=this.paddle;if(e.keyIsDown(e.RIGHT_ARROW)?(t.x+=4,U.waiting&&(U.ball.position.x+=4)):e.keyIsDown(e.LEFT_ARROW)&&(t.x-=4,U.waiting&&(U.ball.position.x-=4)),e.fill("#0390fc"),e.rect(t.x,t.y,o.width,o.height),!U.ball)return;const{velocity:i}=U.ball;N(this.paddle,U.ball)&&(i.y=-i.y)}}),V.addMethod("create",(function(e,{width:t,height:o}){const i=t/4;this.paddle={position:{x:t/2-50,y:o-20},size:{width:i,height:15}}})),W=t.createProcess({draw(t){const{bricks:o}=this,{position:i,velocity:s}=U.ball;t.stroke("#000");for(let n=0;n<o.length;n++){const{position:i,size:r,color:a}=o[n];N(o[n],U.ball)?(s.y=-s.y,o.splice(n,1),e()):(t.fill(a),t.rect(i.x,i.y,r.width,r.height))}}}),W.addMethod("create",(function(e,{width:t}){const o=[],i=t/5;for(let s=0;s<4;s++)for(let e=0;e<5;e++)o.push({position:{x:0+(i+0)*e,y:0+20*s},size:{width:i,height:20},color:H.color()});this.bricks=o}))}({addPoint:g,costLife:b}),i=c(a.value),u(U,V,W)})),{initialized:n,paused:r,csRef:a,bestScore:s,point:l,userLife:d,restartGame:()=>{r.value=!1,i.loop(),d.value<=0&&(localStorage.setItem("[bounce-ball]-bestScore",`${l.value}`),l.value=0,d.value=3,U.create(),W.create())},stopGame:m,startGame:()=>{n.value=!0,h(),V.create(),U.create(),W.create()}}}},$={class:"bounce-ball"},D=a("h1",{class:"text-2xl font-bold"}," P5-hook Shoot-Virus ",-1),X=g(" Return Home "),q={key:0},J={key:1},K={key:2},Q={key:3},Z=a("p",null,[g("Press "),a("code",null,"space"),g(" to shoot the ball")],-1);Y.render=function(e,t,o,i,g,m){const b=s("router-link");return n(),r("div",$,[D,a("small",null,[l(b,{class:"text-blue-500",to:"/"},{default:d((()=>[X])),_:1})]),a("h3",null,"Best Score: "+c(i.bestScore),1),i.userLife>0?(n(),r("div",q,"You Points: "+c(i.point)+", Life: "+c(i.userLife),1)):(n(),r("div",J,"Game Over!!")),i.initialized?(n(),r("div",K,[a("button",{class:"bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md mr-2",onClick:t[0]||(t[0]=(...e)=>i.restartGame&&i.restartGame(...e))},"Restart"),a("button",{class:"bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md mr-2",onClick:t[1]||(t[1]=(...e)=>i.stopGame&&i.stopGame(...e))},"Pause")])):(n(),r("div",Q,[a("button",{class:"bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md",onClick:t[2]||(t[2]=(...e)=>i.startGame&&i.startGame(...e))},"Start")])),Z,a("div",{class:u(["vue-canvas",{paused:i.paused}]),ref:"csRef",onTouchmove:t[3]||(t[3]=h((()=>{}),["prevent"]))},null,34)])};const ee={class:"view-angry-bird"},te=a("h1",{class:"text-2xl font-bold"}," Matterjs Angry-Bird ",-1),oe=g(" Return Home "),ie=a("h3",null,null,-1),se={setup(t){const{Engine:i,Runner:c,Render:u,Body:g,Bodies:m,Composite:b,Composites:p,Mouse:y,MouseConstraint:w,Constraint:v,Events:f,Common:x,SAT:k}=Matter,C={width:window.innerWidth>576?500:window.innerWidth-30,height:window.innerHeight>400?400:window.innerHeight},I={birdOrigin:{x:70,y:C.height-100}},S=e(null);let R,B,M,P,A;class L{constructor(e,t,o,i){this.body=m.rectangle(e,t,o,i,{label:"Ground",isStatic:!0,render:{fillStyle:"#812020"}}),b.add(R.world,this.body)}}class T{constructor(e,t,o=1){const i=this.config={1:{sprite:"cdn/bird1.png",density:.001,scale:.035,radius:14},2:{sprite:"cdn/bird2.png",density:8e-4,scale:.035,radius:14},3:{sprite:"cdn/bird3.png",density:.003,scale:.045,radius:20}}[o];this.body=m.circle(e,t,i.radius,{label:"Bird",restitution:.4,density:i.density,render:{fillStyle:"red",sprite:{texture:i.sprite,xScale:i.scale,yScale:i.scale}}}),b.add(R.world,this.body)}}class z{constructor(e,t){this.body=m.circle(e,t,20,{label:"Pig",restitution:.35,friction:.16,render:{fillStyle:"#7cda26",sprite:{texture:"cdn/pig.png",xScale:.06,yScale:.05}}}),b.add(R.world,this.body)}destroy(){const e=this.body.position,t=p.stack(e.x,e.y,5,5,0,0,(function(e,t){const o=m.rectangle(e,t,5,5,{render:{fillStyle:"#7cda26"}});return g.setVelocity(o,{x:x.random(-3,3),y:-5}),o}));b.remove(R.world,this.body),b.add(R.world,t),setTimeout((()=>{b.remove(R.world,t)}),2e3)}}class E{constructor(e,t,o,i,s=0,n=0){this.body=p.stack(e,t,o,i,s,n,(function(e,t){return m.rectangle(e,t,35,45,{restitution:.2,friction:.25,frictionAir:.04,density:.004})})),b.add(R.world,this.body)}}class F{constructor(e,t,o){this.body=v.create({pointA:{x:e,y:t},bodyB:o,stiffness:.05,render:{visible:!1}}),this.emptyBody=m.rectangle(e,t,1,1,{isStatic:!0,render:{fillStyle:"#fff"}}),b.add(R.world,[this.body])}attach(e){this.body.bodyB=e.body||this.emptyBody}}function _(){R=i.create(),B=c.create(),M=u.create({element:S.value,engine:R,options:{width:C.width,height:C.height,background:"#ccdeff",wireframes:!1}});const{birdOrigin:e}=I,t=new L(C.width/2,C.height-10,C.width,20);new L(C.width+20,C.height/2,20,C.height),new E(C.width-150,C.height-135-20,2,3);let o=new z(C.width-110,C.height-135-20-20),s=new T(e.x,e.y,1);const n=new F(e.x,e.y,s.body),r=y.create(M.canvas),a=w.create(R,{mouse:r,constraint:{render:{visible:!1}}});f.on(a,"enddrag",(function(e){e.body===s.body&&(A=!0)})),f.on(R,"afterUpdate",(function(){const t=s.body.position;A&&function(e,t){const o=Math.abs(t.x-e.x),i=Math.abs(t.y-e.y);return Math.sqrt(o*o+i*i)}(t,e)<s.config.radius+20&&(clearTimeout(P),n.attach({body:null}),A=!1,P=setTimeout((()=>{const t=Math.floor(x.random(1,4));s=new T(e.x,e.y,t),n.attach(s)}),3e3))})),f.on(R,"collisionActive",(function(e){if(o){const e=k.collides(s.body,o.body).collided,i=k.collides(t.body,o.body).collided;(e||i)&&(o.destroy(),o=null)}})),b.add(R.world,a),c.run(B,R),u.run(M)}const O=()=>{R&&(b.clear(R.world),i.clear(R),u.stop(M),c.stop(B),M.canvas.remove(),M.canvas=null,M.context=null,M.textures={}),clearTimeout(P),_()};return o((()=>{_()})),(e,t)=>{const o=s("router-link");return n(),r("div",ee,[te,a("small",null,[l(o,{class:"text-blue-500",to:"/"},{default:d((()=>[oe])),_:1})]),ie,a("div",null,[a("button",{class:"bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md",onClick:O},"Start")]),a("div",{class:"vue-canvas",ref:(e,t)=>{t.csRef=e,S.value=e},onTouchmove:t[0]||(t[0]=h((()=>{}),["prevent"]))},null,544)])}}};const ne={class:"view-angry-bird"},re=a("h1",{class:"text-2xl font-bold"}," P5 + Matterjs Angry-Bird ",-1),ae=g(" Return Home "),le=a("h3",null,null,-1),de={setup(i){const{Engine:c,Bodies:u,Composite:g,Mouse:m,MouseConstraint:b,Constraint:p}=Matter;let y,w,v,f=null;class x{constructor(e,t,o){this.body=u.circle(e,t,o,{restitution:.4}),this.body.label="Bird",this.r=o,g.add(f.world,this.body)}show(){const e=this.body.position,t=this.body.angle;w.push(),w.translate(e.x,e.y),w.rotate(t),w.imageMode(w.CENTER),w.image(y,0,0,2*this.r,2*this.r),w.imageMode(w.CORNER),w.pop()}}class k{constructor(e,t,o,i){this.body=u.rectangle(e,t,o,i,{restitution:.2,friction:.8}),this.w=o,this.h=i,g.add(f.world,this.body)}show(){const e=this.body.position,t=this.body.angle;w.push(),w.translate(e.x,e.y),w.rotate(t),w.fill("#f7ae6a"),w.rectMode(w.CENTER),w.rect(0,0,this.w,this.h),w.pop()}}class C extends k{constructor(e,t,o,i){super(e,t,o,i),this.body.isStatic=!0}show(){const e=this.body.position,t=this.body.angle;w.push(),w.translate(e.x,e.y),w.rotate(t),w.fill("#1dff1d"),w.rectMode(w.CENTER),w.rect(0,0,this.w,this.h),w.pop()}}class I{constructor(e,t,o){const i={pointA:{x:e,y:t},bodyB:o,stiffness:.04,length:0};this.sling=p.create(i),g.add(f.world,this.sling)}show(){if(this.sling.bodyB){w.stroke(255);const e=this.sling.pointA,t=this.sling.bodyB.position;w.line(e.x,e.y,t.x,t.y)}}fly(){this.sling.bodyB=null}attach(e){this.sling.bodyB=e}}function S(){v=t.createProcess({setup(e,{width:t,height:o}){f||(f=this.engine=c.create()),this.bird=new x(100,o-100,20),this.slingshot=new I(100,o-100,this.bird.body),this.ground=new C(t/2,o-10,t,20),this.boxes=[];for(let i=0;i<3;i++)this.boxes[i]=new k(t-100,100-60*i,40,60);this.mouse=m.create(e.canvas.parentNode),this.mConstraint=b.create(this.engine,{mouse:this.mouse}),g.add(this.engine.world,this.mConstraint)},draw(){if(this.engine){c.update(this.engine),this.slingshot.show(),this.bird.show(),this.ground.show();for(let e=0;e<3;e++)this.boxes[e].show()}},on:{mousePressed(e,{mouseX:t,mouseY:o}){if(this.bird){const e=this.bird.body.position;this.birdClicked=function(e,t){const o=t.x-e.x,i=t.y-e.y;return Math.sqrt(o*o+i*i)}(e,{x:t,y:o})<=this.bird.r}},mouseReleased(){this.birdClicked&&(this.birdClicked=!1,setTimeout((()=>{this.slingshot.fly()}),50))},keyPressed({keyCode:e},t,{height:o}){32===e&&(g.remove(this.engine.world,this.bird.body),this.bird=new x(100,o-100,20),this.slingshot.attach(this.bird.body))}}}),v.addMethod("loadAssets",(function(e){y=this.birdImg=e.loadImage("./cdn/bird1.png")}))}const R=e(null),{initCanvas:B,addProcess:M,startAnimate:P}=t.useP5({animateState:!1,width:window.innerWidth>576?500:window.innerWidth-30,height:window.innerHeight>400?400:window.innerHeight,bgColor:0,on:{setup(){},mousePressed(){},mouseReleased(){},keyPressed(){}}}),A=()=>{f&&g.clear(f.world),v.loadAssets(),v.setup(),P()};return o((()=>{S(),w=B(R.value),M(v)})),(e,t)=>{const o=s("router-link");return n(),r("div",ne,[re,a("small",null,[l(o,{class:"text-blue-500",to:"/"},{default:d((()=>[ae])),_:1})]),le,a("div",null,[a("button",{class:"bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md",onClick:A},"Start")]),a("div",{class:"vue-canvas",ref:(e,t)=>{t.csRef=e,R.value=e},onTouchmove:t[0]||(t[0]=h((()=>{}),["prevent"]))},null,544)])}}};const ce={class:"view-matter-mario"},ue=a("h1",{class:"text-2xl font-bold"}," Matterjs Mario Bro 1 ",-1),he=g(" Return Home "),ge=[a("canvas",{id:"my-mario"},null,-1)],me=a("h3",null,"DISCLAIMER",-1),be=a("p",null,"This project is intended for non-commercial educational purposes.",-1),pe=a("div",{class:"controller"},[a("div",{class:"left"},[a("div",{class:"btn-left"}),a("div",{class:"btn-right"})]),a("div",{class:"right"},[a("div",{class:"btn-jump"}),a("div",{class:"btn-shoot"})])],-1),ye={setup(e){async function t(){await createMatterMario(),window.transport.initFrontPage()}return(e,o)=>{const i=s("router-link");return n(),r("div",ce,[ue,a("small",null,[l(i,{class:"text-blue-500",to:"/"},{default:d((()=>[he])),_:1})]),a("div",null,[a("button",{class:"bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md",onClick:t},"Start")]),a("div",{class:"vue-canvas",ref:(e,t)=>{t.csRef=e},onTouchmove:o[0]||(o[0]=h((()=>{}),["prevent"]))},ge,544),me,be,pe])}}};var we=document.createElement("img");we.src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"%3E%3Cpath fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4l-66.1.3c-4.4 0-8-3.5-8-8c0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4l66-.3c4.4 0 8 3.5 8 8c0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2c0 4.4-3.6 8-8 8z"%2F%3E%3C%2Fsvg%3E',fabric.Object.prototype.transparentCorners=!1,fabric.Object.prototype.cornerColor="rgba(0, 0, 0, 0.5)",fabric.Object.prototype.cornerStyle="circle",fabric.Object.prototype.controls.deleteControl=new fabric.Control({x:.5,y:-.5,offsetY:-24,cursorStyle:"pointer",mouseUpHandler:function(e,t){var o=t.target,i=o.canvas;i.remove(o),i.requestRenderAll()},render:function(e,t,o,i,s){var n=this.cornerSize;e.save(),e.translate(t,o),e.rotate(fabric.util.degreesToRadians(s.angle)),e.drawImage(we,-n/2,-n/2,n,n),e.restore()},cornerSize:24});const ve={name:"FabricImageComposer",data:()=>({giveSize:!1,size:{width:300,height:500,background:""},imageLoading:!1,pickColor:"#e66465",pickImage:"",fileImage:null}),methods:{onInitCanvas(){this.giveSize=!0,this.$nextTick((()=>this.initFabric()))},initFabric(){const e=this;this._canvas=new fabric.Canvas("c",{width:e.size.width,height:e.size.height,backgroundColor:e.size.background||!1})},addRect(){var e=new fabric.Rect({left:0,top:0,fill:this.pickColor,width:100,height:100,objectCaching:!1,stroke:"transparent",strokeWidth:0});this._canvas.add(e),this._canvas.setActiveObject(e)},addImage(){const e=this;e.imageLoading||(e.imageLoading=!0,fabric.util.loadImage(this.pickImage,(function(t){const o=t.height/t.width;var i=new fabric.Image(t,{left:0,top:0,angle:0,opacity:1,scaleX:200/t.width,scaleY:200/t.height*o});e._canvas.add(i),e._canvas.setActiveObject(i),e.imageLoading=!1,e.pickImage=""})))},onUploadImage(e){const t=e.target,o=t.files[0],i=new FileReader;i.onload=()=>{this.pickImage=i.result,t.value="",t.type="",t.type="file"},i.readAsDataURL(o)},onSave(){document.getElementById("c").toBlob((function(e){saveAs(e,"image-composer.png")}))},onBringForward(){this._canvas.getActiveObject().bringForward()},onSendBackward(){this._canvas.getActiveObject().sendBackwards()},onBringToFront(){this._canvas.getActiveObject().bringToFront()},onSendToBack(){this._canvas.getActiveObject().sendToBack()}}},fe={class:"fabric-image-composer container mx-auto mb-5 text-center"},xe=a("h1",{class:"text-2xl font-bold"},"Image Composer",-1),ke=g(" Return Home "),Ce=a("canvas",{id:"c",class:"border border-slate-400"},null,-1),Ie={class:"grid gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5"},Se={class:"mt-3"},Re=a("h3",null,"Rect",-1),Be={class:"mt-3"},Me=a("h3",null,"Image",-1),Pe={class:"grid grid-flow-row mt-3"},Ae={key:1,class:"max-w-xs mx-auto text-left"},Le=g(" Width: "),Te=g(" Height: "),ze=g(" Background: ");ve.render=function(e,t,o,i,u,h){const g=s("router-link");return n(),r("div",fe,[xe,a("small",null,[l(g,{class:"text-blue-500",to:"/"},{default:d((()=>[ke])),_:1})]),u.giveSize?(n(),r(m,{key:0},[a("button",{class:"block bg-yellow-400 hover:bg-yellow-500 rounded-md text-white px-3 py-1 my-3 mx-auto",onClick:t[0]||(t[0]=(...e)=>h.onSave&&h.onSave(...e))},"Download"),Ce,a("div",Ie,[a("div",Se,[Re,b(a("input",{class:"block mx-auto mb-2",type:"color","onUpdate:modelValue":t[1]||(t[1]=e=>u.pickColor=e)},null,512),[[p,u.pickColor]]),a("button",{class:"bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1",onClick:t[2]||(t[2]=(...e)=>h.addRect&&h.addRect(...e))},"Add Rect")]),a("div",Be,[Me,b(a("input",{type:"text",class:"block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-2","onUpdate:modelValue":t[3]||(t[3]=e=>u.pickImage=e),placeholder:"Image URL"},null,512),[[p,u.pickImage]]),a("input",{class:"block file w-full mb-2",type:"file",onChange:t[4]||(t[4]=(...e)=>h.onUploadImage&&h.onUploadImage(...e))},null,32),a("button",{class:"bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1",onClick:t[5]||(t[5]=(...e)=>h.addImage&&h.addImage(...e))},c(u.imageLoading?"loading...":"Add Image"),1)]),a("div",Pe,[a("button",{class:"bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2",onClick:t[6]||(t[6]=(...e)=>h.onBringForward&&h.onBringForward(...e))},"bringForward"),a("button",{class:"bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2",onClick:t[7]||(t[7]=(...e)=>h.onSendBackward&&h.onSendBackward(...e))},"sendBackward"),a("button",{class:"bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2",onClick:t[8]||(t[8]=(...e)=>h.onBringToFront&&h.onBringToFront(...e))},"bringToFront"),a("button",{class:"bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1",onClick:t[9]||(t[9]=(...e)=>h.onSendToBack&&h.onSendToBack(...e))},"sendToBack")])])],64)):(n(),r("div",Ae,[Le,b(a("input",{class:"block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3","onUpdate:modelValue":t[10]||(t[10]=e=>u.size.width=e)},null,512),[[p,u.size.width]]),Te,b(a("input",{class:"block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3","onUpdate:modelValue":t[11]||(t[11]=e=>u.size.height=e)},null,512),[[p,u.size.height]]),ze,b(a("input",{class:"block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3","onUpdate:modelValue":t[12]||(t[12]=e=>u.size.background=e),placeholder:"transparent by default"},null,512),[[p,u.size.background]]),a("button",{class:"bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1",onClick:t[13]||(t[13]=(...e)=>h.onInitCanvas&&h.onInitCanvas(...e))},"Start")]))])};const Ee={name:"ViewHome"},Fe={class:"view-home"},_e=a("img",{class:"block mx-auto",alt:"Vue logo",src:"./assets/logo.03d6d6da.png"},null,-1),Oe=a("h1",{class:"text-2xl font-bold"},"Tiny Game",-1),Ge={class:"game-list"},je=g("[Shoot Virus]"),He=g("[Bounce ball]"),Ue=g("[P5 Angry Bird]"),Ve=g("[Angry Bird]"),We=g("[Mario Bro 1]"),Ne=g("[Fabric Image Composer]");Ee.render=function(e,t,o,i,c,u){const h=s("router-link");return n(),r("div",Fe,[_e,Oe,a("div",Ge,[l(h,{to:"/shoot-virus"},{default:d((()=>[je])),_:1}),l(h,{to:"/bounce-ball"},{default:d((()=>[He])),_:1}),l(h,{to:"/angry-bird-p5"},{default:d((()=>[Ue])),_:1}),l(h,{to:"/angry-bird"},{default:d((()=>[Ve])),_:1}),l(h,{to:"/matter-mario"},{default:d((()=>[We])),_:1}),l(h,{to:"/fabric-image-composer"},{default:d((()=>[Ne])),_:1})])])};const Ye=[{path:"/",name:"ViewHome",component:Ee},{path:"/shoot-virus",name:"ShootVirus",component:R},{path:"/bounce-ball",name:"BounceBall",component:Y},{path:"/angry-bird",name:"AngryBird",component:se},{path:"/angry-bird-p5",name:"AngryBirdOld",component:de},{path:"/matter-mario",name:"MatterMario",component:ye},{path:"/fabric-image-composer",name:"FabricImageComposer",component:ve}];var $e=y({history:w("/p5-game/"),routes:Ye});const De={name:"App"};De.render=function(e,t,o,i,r,a){const l=s("router-view");return n(),v(l)},f(De).use($e).mount("#app");