local d=string.byte;local f=string.char;local c=string.sub;local H=table.concat;local u=table.insert;local b=math.ldexp;local E=getfenv or function()return _ENV end;local l=setmetatable;local s=select;local r=unpack or table.unpack;local h=tonumber;local function J(d)local e,n,a="","",{}local o=256;local t={}for l=0,o-1 do t[l]=f(l)end;local l=1;local function i()local e=h(c(d,l,l),36)l=l+1;local n=h(c(d,l,l+e-1),36)l=l+e;return n end;e=f(i())a[1]=e;while l<#d do local l=i()if t[l]then n=t[l]else n=e..c(e,1,1)end;t[o]=e..c(n,1,1)a[#a+1],e,o=n,n,o+1 end;return table.concat(a)end;local i=J('21A2122752111Z27521222E22C22722022A21121327921Z27927K21E22U27G27921X2111Y27922021V22M27F27H27521T27O27522628121222727K21221E27921G1W27927Y21221G27527H21028A27528J21128K21228N27S28727621227H28G27927828727H28N27528W28J28C29228T1X28O27S27428Z21227S27Y21421228J28J2751Y21627921J28U28F29O27828E21221521228C29127529V29828R27521B21227829827H1W21I27921729P28J29L2AB29P21229828H279');local o=bit and bit.bxor or function(l,e)local n,o=1,0
while l>0 and e>0 do
local c,a=l%2,e%2
if c~=a then o=o+n end
l,e,n=(l-c)/2,(e-a)/2,n*2
end
if l<e then l=e end
while l>0 do
local e=l%2
if e>0 then o=o+n end
l,n=(l-e)/2,n*2
end
return o
end
local function n(n,l,e)if e then
local l=(n/2^(l-1))%2^((e-1)-(l-1)+1);return l-l%1;else
local l=2^(l-1);return(n%(l+l)>=l)and 1 or 0;end;end;local l=1;local function e()local n,c,a,e=d(i,l,l+3);n=o(n,38)c=o(c,38)a=o(a,38)e=o(e,38)l=l+4;return(e*16777216)+(a*65536)+(c*256)+n;end;local function t()local e=o(d(i,l,l),38);l=l+1;return e;end;local function a()local e,n=d(i,l,l+2);e=o(e,38)n=o(n,38)l=l+2;return(n*256)+e;end;local function h()local l=e();local e=e();local c=1;local o=(n(e,1,20)*(2^32))+l;local l=n(e,21,31);local e=((-1)^n(e,32));if(l==0)then
if(o==0)then
return e*0;else
l=1;c=0;end;elseif(l==2047)then
return(o==0)and(e*(1/0))or(e*(0/0));end;return b(e,l-1023)*(c+(o/(2^52)));end;local b=e;local function J(e)local n;if(not e)then
e=b();if(e==0)then
return'';end;end;n=c(i,l,l+e-1);l=l+e;local e={}for l=1,#n do
e[l]=f(o(d(c(n,l,l)),38))end
return H(e);end;local l=e;local function b(...)return{...},s('#',...)end
local function f()local i={};local o={};local l={};local d={i,o,nil,l};local l=e()local c={}for n=1,l do
local e=t();local l;if(e==2)then l=(t()~=0);elseif(e==0)then l=h();elseif(e==3)then l=J();end;c[n]=l;end;for l=1,e()do o[l-1]=f();end;d[3]=t();for d=1,e()do
local l=t();if(n(l,1,1)==0)then
local o=n(l,2,3);local t=n(l,4,6);local l={a(),a(),nil,nil};if(o==0)then
l[3]=a();l[4]=a();elseif(o==1)then
l[3]=e();elseif(o==2)then
l[3]=e()-(2^16)elseif(o==3)then
l[3]=e()-(2^16)l[4]=a();end;if(n(t,1,1)==1)then l[2]=c[l[2]]end
if(n(t,2,2)==1)then l[3]=c[l[3]]end
if(n(t,3,3)==1)then l[4]=c[l[4]]end
i[d]=l;end
end;return d;end;local function h(l,e,a)local e=l[1];local n=l[2];local l=l[3];return function(...)local c=e;local e=n;local o=l;local l=b
local n=1;local l=-1;local i={};local d={...};local t=s('#',...)-1;local l={};local e={};for l=0,t do
if(l>=o)then
i[l-o]=d[l+1];else
e[l]=d[l+1];end;end;local l=t-o+1
local l;local o;while true do
l=c[n];o=l[1];if o<=9 then if o<=4 then if o<=1 then if o>0 then
local o=l[2];local a=l[4];local c=o+2
local o={e[o](e[o+1],e[c])};for l=1,a do
e[c+l]=o[l];end;local o=o[1]if o then
e[c]=o
n=l[3];else
n=n+1;end;else
local n=l[2];local o=e[n];for l=n+1,l[3]do
u(o,e[l])end;end;elseif o<=2 then e[l[2]]={};elseif o==3 then
local n=l[2];local o=e[n];for l=n+1,l[3]do
u(o,e[l])end;else for l=l[2],l[3]do e[l]=nil;end;end;elseif o<=6 then if o>5 then local o;e[l[2]]=a[l[3]];n=n+1;l=c[n];e[l[2]]=l[3];n=n+1;l=c[n];e[l[2]]=l[3];n=n+1;l=c[n];e[l[2]]=l[3];n=n+1;l=c[n];o=l[2]e[o](r(e,o+1,l[3]))n=n+1;l=c[n];e[l[2]]=a[l[3]];n=n+1;l=c[n];e[l[2]]={};n=n+1;l=c[n];e[l[2]]=l[3];n=n+1;l=c[n];e[l[2]]=l[3];n=n+1;l=c[n];e[l[2]]=l[3];else e[l[2]]=a[l[3]];end;elseif o<=7 then do return end;elseif o==8 then e[l[2]]=l[3];else
local n=l[2]e[n](r(e,n+1,l[3]))end;elseif o<=14 then if o<=11 then if o>10 then do return end;else e[l[2]]=e[l[3]];end;elseif o<=12 then n=l[3];elseif o>13 then for l=l[2],l[3]do e[l]=nil;end;else n=l[3];end;elseif o<=17 then if o<=15 then e[l[2]]=e[l[3]];elseif o==16 then
local o=l[2];local a=l[4];local c=o+2
local o={e[o](e[o+1],e[c])};for l=1,a do
e[c+l]=o[l];end;local o=o[1]if o then
e[c]=o
n=l[3];else
n=n+1;end;else e[l[2]]=a[l[3]];end;elseif o<=18 then
local n=l[2]e[n](r(e,n+1,l[3]))elseif o>19 then e[l[2]]=l[3];else e[l[2]]={};end;n=n+1;end;end;end;return h(f(),{},E())();