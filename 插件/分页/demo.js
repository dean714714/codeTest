var newDomArr = [];
for(var i=0;i<9;i++){//生成一组dom,变动其值和显隐来控制点击后的序列
	var $dom = document.createElement('span');
	$dom.style.display = 'inline-block';
	$dom.innerHTML = i;
	newDomArr.push($dom);
	
}

function chooseNum(dom,num,index){
	
	if(index-2>2&&index+3<num){
		for(var j=0,len=newDomArr.length;j<len;j++){
			if(j===0||j===len-1){
				if(j===0){newDomArr[j].innerHTML = j+1;}else{
					newDomArr[j].innerHTML = num;
				}
			}else if(j===1||j===len-2){
				newDomArr[j].innerHTML = '...';
			}else{
				newDomArr[j].innerHTML = index-4+j;
				if(j===4){
					newDomArr[j].style.cssText = 'background:green;color:#fff;';
				}
			}
			dom.appendChild(newDomArr[j]);
		}
		
	}else if(index-2<=2&&index+3<num){
		for(var k=0,len=newDomArr.length;k<len;k++){
			if(k<5){
				newDomArr[k].innerHTML = k+1;
				if(k===index-1){
					newDomArr[k].style.cssText = 'background:green;color:#fff;';
				}
			}else if(k===5){
				newDomArr[k].innerHTML = '...';
			}else if(k===len-1){
				newDomArr[k].innerHTML = num;
			}else{
				newDomArr[k].style.display = 'none';
			}
			dom.appendChild(newDomArr[k]);
		}
	}else if(index-2>2&&index+3>=num){
		for(var h=0,len=newDomArr.length;h<len;h++){
			if(h===0||h===1){
				h===0&&(newDomArr[h].innerHTML = 1);
				h===1&&(newDomArr[h].innerHTML = '...');
			}else if(h>=3){
				newDomArr[h].innerHTML = num-8+h;
				if(num-index===len-1-h){
					newDomArr[h].style.cssText = 'background:green;color:#fff;';
				}
			}else{
				newDomArr[h].style.display = 'none';
			}
			dom.appendChild(newDomArr[h]);
		}
	}
	
	
//	for(var i=0,len=domArr.length;i<len;i++){
//		domArr[i].addEventListener('click',function(e){
//			var e = e||event;
//			var thisNum = e.target.innerText.match(/[\d...]/g).join('');
//		})
//	}
}
