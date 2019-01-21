var subjectTimerObj;
var game = new Vue({
	el: "#wrap",
	data: {
		firstPage: true,
		secondPage: false,
		thirdPage: false,
		subjectLists: false,
		subjectListStatus: false,
		guidTip: false,
		guidTipStatus: true,
		successStatus: false,
		successAnimatedStatus: true,
		failStatus: false,
		failAnimated: true,
		timeClock: 0,
		leftTime: 8,
		subjectTimer: 0,
		explain: false,
		explainAnimate: false,
		statusList: [ '8秒内找出“滑皮”的融安滑皮金桔', '8秒内找出“滑皮”的融安滑皮金', '8秒内找出“水果味”的蛋黄酥', '8秒内找出“梨型”的容县沙田柚', '8秒内找出“金黄色”的黄金百香果', '8秒内找出“红心”的红心芭乐番石榴', '8秒内找出“蛋黄呈红色”的北海鸭蛋' ],
		subjectItemList: [], //题目列表
		tipList: [], //提示列表
		numList: [], //题目数字索引
		subjectIndex: 1, //第几题
		timerStatus: false,
		timerAnimatedStatus: false,
		specialIndex: 5,
		musicSpin: true,
		musicPlayStatus: false,
		onceFlag: false
	},
	methods: {
	   getSubject: function(){
	   	  this.subjectItemList = []
	   	  for(var i=1; i<=7; i++){
	   	  	if(this.specialIndex == i){
	   	  		var obj = {
					iconF: './imgs/fruit'+ i +'F.png',
					iconT: './imgs/fruit'+ i +'T.png',
					numT: this.getRandom(1,4)
				}
	   	  	} else {
	   	  		var obj = {
					iconF: './imgs/fruit'+ i +'F.png',
					iconT: './imgs/fruit'+ i +'T.png',
					numT: this.getRandom(1,28)
				}
	   	  	}
	   	  	
			this.subjectItemList.push(obj)
	   	  }
	   	  console.log(this.subjectItemList)
	   },
	   getTip: function(){
	   	  for(var i=1; i<=7; i++){
	   	  	var obj = './imgs/checkpoint'+ i +'.png';
			this.numList.push(obj)
	   	  }
	   },
	   getNum: function(){
	   	  for(var i=1; i<=7; i++){
	   	  	var obj = './imgs/txt'+ i +'.png';
			this.tipList.push(obj)
	   	  }
	   },
	   getRandom: function(min, max){
            var r = Math.random() * (max - min);
            var re = Math.round(r + min);
            re = Math.max(Math.min(re, max), min)
            return re;
        },
	   firstTimer: function(){
	   	  var _this = this
		  Resloader.UI({ afterDelay: 1000, expires: 5 }).on('progress', function(data){
		  	if(_this.timeClock <100){
		  	   _this.timeClock = parseInt((data.progress)*100)
		  	} else {
		  	   setTimeout(function(){
		  	   	  _this.firstPage = false
	   	  	 	  _this.secondPage = true
		  	   },800)
		  	}
		  });
	   	  // var magnification = this.randomInt()
	   	  // var _this = this; 
	   	  // if(this.timeClock <100){
	   	  // 	 setTimeout(function(){
	   	  // 	 	_this.timeClock++
	   	  // 	 	// _this.firstTimer()
	   	  // 	 }, magnification*10)
	   	  // } else {
	   	  // 	 this.firstPage = false
	   	  // 	 this.secondPage = true
	   	  // }
	   },
	   randomInt: function(){
	   	  return Math.round(Math.random()*5 + 1)
	   },
	   readyGo: function(){
	   	  this.secondPage = false
	   	  this.thirdPage = true
	   	  this.explain = true
	   	  this.playMusic()
	   },
	   outAnimate: function(){
	   	  var _this = this;
	   	  this.explainAnimate = !this.explainAnimate
	   	  setTimeout(function(){
	   	  	_this.explain = false
	   	  	_this.explainAnimate = false
	   	  	_this.guidTip = true
	   	  	setTimeout(function(){
	   	  		_this.guidFunc()
	   	  	},2500)
	   	  },700)
	   },
	   guidFunc: function(){
	   	  var _this = this;
	      this.guidTipStatus = !this.guidTipStatus
	      this.timerAnimatedStatus = false
	      setTimeout(function(){
	   	  	_this.guidTip = false
	   	  	_this.timerStatus = true
			_this.subjectLists = true
			_this.guidTipStatus = true
			_this.timer()
	   	  },700)
	   },
	   gameGoOn: function(){
	   	  clearInterval(subjectTimerObj)
	   	  var _this = this;
	   	  this.leftTime = 8
	   	  this.subjectListStatus = true
	   	  this.timerAnimatedStatus = true
	   	  setTimeout(function(){
	   	  	 _this.subjectLists = false
	   	  	 _this.timerAnimatedStatus = true
	   	  	 _this.timerStatus = false
	   	  	 _this.subjectListStatus = false
	   	  },500)
	   	  if( this.subjectIndex <= 6 ){
	   	  	 setTimeout(function(){
	   	  	 	_this.subjectIndex = _this.subjectIndex + 1
	   	  	 },500)
	   	  	 this.outAnimate()
	   	  } else {
	   	  	this.successStatus = true
	   	  	// this.successAnimatedStatus = true
	   	  }
	   },
	   gameOver: function(){
	   	  var _this = this; 
	   	  clearInterval(subjectTimerObj)
	   	  this.failStatus = true
	   	  this.timerAnimatedStatus = true
	   	  setTimeout(function(){
	   	     _this.timerStatus = false
	   	     _this.timerAnimatedStatus = false
	   	  },500)
		  this.subjectLists = false
	   	  this.getSubject()
	   },
	   //题目时间倒计时
	   timer: function(){
	   	  var _this = this;
	   	  subjectTimerObj = setInterval(function(){
	   	  	if(_this.leftTime != 0 ){
	   	  		_this.leftTime--
	   	  	} else {
	   	  		clearInterval(subjectTimerObj)
	   	  		
	   	  		_this.gameOver();
	   	  	}
	   	  },1000)
	   },
	   onceAgain: function(){
	   	  var _this = this;
	   	  this.onceFlag = true
		  this.readyGo()
	   	  this.failAnimated = false;
	   	  this.successAnimatedStatus = false
	   	  setTimeout(function(){
	   	  	_this.failStatus = false
	   	  	_this.failAnimated = true
	   	  	_this.successStatus = false
	   	  	_this.successAnimatedStatus = true
	   	  	_this.leftTime = 8
			_this.subjectIndex = 1
	   	  },700)
	   },
	   playMusic: function (){
	   	    if(this.onceFlag){ 
	   	    	this.onceFlag = false; 
	   	    	return false
	   	    }
	        var audio = document.getElementById('music1');
	        if(audio!==null){
	            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
	            //alert(audio.paused);
	            if(audio.paused)                     {
	                audio.play();//audio.play();// 这个就是播放
	                this.musicPlayStatus = true
	            }else{
	                audio.pause();// 这个就是暂停
	                this.musicPlayStatus = false
	            }
	        }
	    },
	    isPaused: function(){
	    	var audio = document.getElementById('music1');
	    	console.log(audio.paused)
	    	if(audio!==null){
	            if(audio.paused)                     {
	                this.musicPlayStatus = false
	            }else{
	                this.musicPlayStatus = true
	            }
	        }
	    }
	},
	ready: function(){
		this.firstTimer()
		this.getSubject()
		this.getTip()
		this.getNum()
		this.isPaused()
		// Resloader.UI({ afterDelay: 1000, expires: 5 }).on('progress', function(data){console.log(data)});
	}
})


