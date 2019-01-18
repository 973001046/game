new Vue({
	el: "#wrap",
	data: {
		firstPage: true,
		secondPage: false,
		thirdPage: false,
		subjectLists: false,
		guidTip: false,
		guidTipStatus: true,
		successStatus: false,
		failStatus: false,
		timeClock: 0,
		leftTime: 0,
		subjectTimer: 0,
		explain: false,
		explainAnimate: false,
		statusList: [ '8秒内找出“滑皮”的融安滑皮金桔', '8秒内找出“滑皮”的融安滑皮金', '8秒内找出“水果味”的蛋黄酥', '8秒内找出“梨型”的容县沙田柚', '8秒内找出“金黄色”的黄金百香果', '8秒内找出“红心”的红心芭乐番石榴', '8秒内找出“蛋黄呈红色”的北海鸭蛋' ],
		subjectItemList: [], //题目列表
		tipList: [], //提示列表
		numList: [], //题目数字索引
		subjectIndex: 1, //第几题
		timerStatus: false
	},
	methods: {
	   getSubject: function(){
	   	  for(var i=1; i<=7; i++){
	   	  	var obj = {
				iconF: './imgs/fruit'+ i +'F.png',
				iconT: './imgs/fruit'+ i +'T.png',
				numT: this.getRandom(1,28)
			}
			this.subjectItemList.push(obj)
	   	  }
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
	   	  var magnification = this.randomInt()
	   	  var _this = this; 
	   	  if(this.timeClock <100){
	   	  	 setTimeout(function(){
	   	  	 	_this.timeClock++
	   	  	 	_this.firstTimer()
	   	  	 }, magnification*10)
	   	  } else {
	   	  	 this.firstPage = false
	   	  	 this.secondPage = true
	   	  }
	   },
	   randomInt: function(){
	   	  return Math.round(Math.random()*5 + 1)
	   },
	   readyGo: function(){
	   	  this.secondPage = false
	   	  this.thirdPage = true
	   	  this.explain = true
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
	      setTimeout(function(){
	   	  	_this.guidTip = false
	   	  	_this.timerStatus = true
			_this.subjectLists = true
	   	  },700)
	   }
	},
	ready: function(){
		this.firstTimer()
		this.getSubject()
		this.getTip()
		this.getNum()
	}
})