$(document).ready((function(){if(document.querySelector(".collapsible-share-guia")){let e=document.querySelector(".collapsible-share-guia");e.addEventListener("click",()=>{e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")})}if(document.querySelector(".collapsible-share-article")&&$(".btn-share").click(e=>{$(e.target).parents(".collapsible-share-article").first().toggleClass("active")}),document.querySelector("body.single")&&document.querySelector(".collapsible-share")){document.querySelector(".article-wrapper"),document.querySelector(".collapsible-share");document.querySelector(".article-content .col-center")&&e(document.querySelector(".article-content .col-center"))}function e(e,t=992,c=24){const o=e.getBoundingClientRect().left,n=document.querySelector(".collapsible-share").offsetWidth;window.innerWidth>=t?$(".collapsible-share").css("left",o-n-c+"px"):$(".collapsible-share").css("left","auto")}function t(){const e=$(".menu-subcat"),t=$(".dropdown-menu-subcat"),c=$(".menu-subcat .dropdown-item");let o=window.innerWidth;if(o>991){let n=$(".nav-menu-subcat").outerWidth(),s=c.outerWidth(!0),i=0;e.find(".main-item").each((function(e){let t=$(this),o=t.outerWidth(!0);i+=o,i+60+s>n?(t.css("display","none"),$(".dropdown-menu-subcat li:nth-child("+(e+1)+")").css("display","block"),c.css("display","block")):(t.css("display","block"),$(".dropdown-menu-subcat li:nth-child("+(e+1)+")").css("display","none"),c.css("display","none"))}));let l=c.offset().left;t.css("right",o-l-s-16+"px")}else e.find(".main-item").css("display","block"),c.css("display","none"),t.removeClass("active")}if(document.querySelector(".container-special")&&document.querySelector(".collapsible-share")&&e(document.querySelector(".container-special"),1376,5),document.querySelector(".nav-menu-subcat")&&(t(),document.addEventListener("click",e=>{const t=document.querySelector(".menu-subcat .dropdown-item"),c=document.querySelector(".dropdown-menu-subcat");let o=e.target;do{if(o==t)return void c.classList.add("active");o=o.parentNode}while(o);c.classList.remove("active")})),document.querySelector(".nav-menu-subcat")&&window.addEventListener("resize",(function(){t()}),!0),document.querySelector(".article-content .col-center")&&document.querySelector(".collapsible-share")){const t=document.querySelector(".article-content .col-center");window.addEventListener("resize",(function(){e(t)}),!0)}if(document.querySelector(".container-special")&&document.querySelector(".collapsible-share")){const t=document.querySelector(".container-special");window.addEventListener("resize",(function(){e(t,1376,5)}),!0)}$("#cookies-consent .btn-center").click((function(){$("#cookies-consent").removeClass("active"),function(e,t){const c=new Date;c.setTime(c.getTime()+31536e6);const o="expires="+c.toUTCString();document.cookie=`${e}=${t};${o};path=/`}("wordpress_cookies_accepted",!0),setTimeout((function(){$("#cookies-consent").remove()}),300)}))}));