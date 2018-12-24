$(function(){
	try{
		if(MEDIA_TYPE != undefined) {
			if(MEDIA_TYPE != null && MEDIA_TYPE != ""){
				if(MEDIA_TYPE == "MW") {
					//$("body").addClass("m_web");
					
					//20180207에 배포
					$("#container_inner").addClass("mwebCont");
				}
			}
	    }
	}catch(e){}
	ui();
	click();
	tab_title();
	//layer_top();
});
$(window).ready(function(){
	tab_title();
})

var layer_btn;

//화면 해상도 변화시 변경 ui
function resize(){
	var b_width = $(window).width(),
		b_height = $(window).height(),
		_layerWrapForm = $('.layer_wrap').find('form').find('.layer_cont');

	
	_layerWrapForm.each(function(){
		
		$(this).parents('form').addClass('formLocation');
			
	});
	

	//모바일 컨텐츠 레이아웃
	if(b_width < 699){
		$('.fake_table dd').removeAttr('style');
		$('.m_calendar').removeClass('wide');
		$('.account_list_body').height(b_height - 57);
		$('.col_vari').attr('style','width:100px');
		if($('.content').hasClass('login_pc') || $('.content').hasClass('web')){
			$('#container_inner').css('padding-top','0');
		}
	}
	// 웹 컨텐츠
	if(b_width >= 699){
		$('.m_calendar').addClass('wide');
		$('.account_list_body').css({
			height:'443px'
		});
		$('.col_vari').attr('style','width:180px');
	}

	//웹 & 모바일 화면 레이아웃
	if(b_width < 320){
		$('.header, #container').css('width','320px');
		if($('.content').hasClass('web')){
			$('.footer').css('width','940px');
		}else{
			$('.footer').css('width','320px');
		}
	}else{
		$('.header, #container').css('width','100%');
		if($('.content').hasClass('web')){
			$('.footer').css('width','940px');
		}else{
			$('.footer').css('width','100%');
		}
	}

	//PC GNB
	$('.header.pc .depth02').each(function(){
		var left = $(this).parent().offset().left;
		$(this).css({
			width:b_width,
			left:-left
		});
	});

	//pc gnb li갯수 체크하여 스타일 제어
	$('.header.pc .depth02').children('ul').each(function(){
		var o = 0;
		$(this).children('li').each(function(){
			o += $(this).outerWidth();
		});
		if(o > 966){
			$(this).css({
				width:'966px'
			});
			$(this).children().each(function(){
				var idx = $(this).index();
				if(idx % 6 == '0'){
					$(this).css('border-left','0');
				}
			});
			$(this).children('li').each(function(){
				var idx = $(this).index();
				if(idx >= 6){
					$(this).css({marginTop:'30px'});
				}
			});
		}else{
			if($(this).parent().hasClass('offset')){
				var offset = $(this).closest('li').offset().left;
				$(this).css('margin-left',offset-20);
			}
			$(this).width(o);
		}
	});

	// MOBILE GNB depth02_wrap li갯수에 따라 this 크기 제어
	$('.nav').each(function(){
		var nw = $(this).width(),
			nh = $(this).height();
		$(this).find('.depth02_wrap').each(function(){
			var idx = $(this).parent().index();
			$(this).css({
				height: ( b_height - 162 ) + 'px',
			    position: 'relative'
			});
		});
		$(this).children('.depth01').height(b_height-162);
	});
	$('.depth02 > li > ul > li').each(function(){
		if($(this).children('ul').length > 0){
			$(this).addClass('dep3');
		}
	});
	$('.btn_radio01,.btn_radio,.btn_checkbox').attr('tabindex','0');

	// STEP UI
	$('.step').each(function(){
		$(this).children().first().addClass('first');
		$(this).children().last().addClass('last');
	});


	//layer_cont 디바이스별 높이값 조정
	//20181206 
	$('.layer_body').each(function(){
		var ch = 0;
		if($('html').hasClass('ios')){
			$(this).closest('.layer_cont').attr('tabindex','0');
		}
		$(this).children().each(function(){
			ch += $(this).outerHeight();
		});
		if($(this).closest('.layer_cont').hasClass('full')){
			if(b_width >= 699){
				if($(this).next().is('.layer_foot') || $(this).next().is('.vari_btn')){
					$(this).height(490);
				}else{
					$(this).height(600);
				}
			}else{
				if($(this).next().is('.layer_foot') || $(this).next().is('.vari_btn')){
					$(this).height($(window).height() - $('.layer_top').outerHeight() - $('.layer_foot').outerHeight() - $('.layer_cont .vari_btn').outerHeight());
				}else{
					$(this).height($(window).height() - $('.layer_top').outerHeight());
				}
			}
		}else{
			if(b_width < 360){
				if(ch > 240){
					if($(this).prev().is('.info_box')){
						$(this).height($(window).height() - $('.layer_top').outerHeight() - $('.layer_foot').outerHeight() - $('.layer_cont > .info_box').outerHeight() - 70);
					}else{
						$(this).css({
							height:'240px'
						});
						var w_h = $(window).height();
						var c_h = $(this).parents('.layer_cont').height();
						//아이폰5 높이설정
						// $(this).parents('.layer_wrap').css('top', '0');
						// $(this).parents('.layer_cont').css('margin-top',(w_h-c_h-20)/2);
					}
				}
			}else{
				if(ch > 450){
					$(this).css({
						height:'450px'
					});
					var w_h = $(window).height();
					var c_h = $(this).parents('.layer_cont').height();
					//아이폰5 높이설정
					// $(this).parents('.layer_wrap').css('top', '0');
					// $(this).parents('.layer_cont').css('margin-top',(w_h-c_h-20)/2);
				}
			}
		}
		if($(this).closest('.layer_cont').hasClass('dual_wrap')){
			if(b_width >= 699){
				$(this).height(650);
			}else{
				$(this).height($(window).height());
			}
		}
	});

	$('.full .table_h01').each(function(){
		var body_h = $(this).closest('.layer_body').height();
		$(this).height(body_h);
	});

	// 기본 탭
	$('.tab_type01').each(function(){
		var ea = $(this).children().size(),
			content = $(this).closest('.content').width(),
			inbox = $(this).width();
		if($(this).parent().hasClass('inbox')){
			$(this).children().css('width',inbox/ea);
		}else{
			$(this).children().css('width',content/ea);
		}
		$(this).find('.on').children('a').attr('title','메뉴 선택됨');
		$(this).find('.on').children('a').attr('href','#n');
	});

	//slide list size
	$('.detail_sl > ul').each(function(){
		var ea = $(this).children().size(),
			sl_width = $(this).closest('.detail_sl').width();
		$(this).width(ea * sl_width);
		$('.detail_sl > ul > li').width(sl_width).children().width(sl_width);
	});

	//slide wrap height
	$('.auto_sl img').load(function(){
		$('.auto_sl').each(function(){
			if($(this).parent().hasClass('visual_banner_area')){
				var img_h = $(this).parent().height();
				$(this).height(img_h);
				$(this).children('ul').height(img_h);
			}else{
				var img_h = $(this).find('li:first').children().height();
				$(this).height(img_h);
				$(this).children('ul').height(img_h);
			}
		});
	}).each(function(){
		if(this.complete) $(this).load();
	});

	// only web 화면을 위한 스크립트
	$('.content.web').each(function(){
		if(b_width < 699){
			$(this).closest('#container').width(940);
			$(this).closest('#content').css({
				float:'right',
				width:'680px'
			});
		}
	});

	

}


/*
	ul() - #화면 로딩시 전체적 ui 담당함
*/

function ui(){

	$(document).ready(function(){

		//임시 팝업 상단 padding
		// if( $('.layer_top2').find('.mTabType').length == '1' ){
	
		// 	$('.layer_top2').addClass('imsi');

		// }

		//방카 메인에서 layer_wrap0 아이디값 중복으로 insert되는 이슈 임시처리
		if ( $('#container_inner').find('.layer_wrap').html() == '' ){
			$('#container_inner').find('.layer_wrap').remove();
		}

		//꼭확인하세요 구버전 > 신버전으로 교체
		var _cautionWrap = $('.list_dropdown.caution');

		if( _cautionWrap ){

			_cautionWrap.removeAttr('class').addClass('caution_panel');

		}

		// #wrap가 widnow.height보다 짧은 경우, 화면에 맞게 height 설정
		if( $('html').hasClass('mobile')){

			var _winHeight = $(window).height(),
				_wrapLayer = $('#wrap'),
				_wrapHeight = _wrapLayer.height();

			if( _wrapHeight < _winHeight ){
				_wrapLayer.css('height', _winHeight);
			}
		}

		if($('html').hasClass('android')){
			// 안드로이드 패스워드 input 클릭시에 플로팅 버튼 content에 달라붙는 증상
			$('input[type="password"]').on('click',function(){
				$('html.android .vari_btn, html.android .float_btns').css({
					position:'fixed',
					marginTop:'0px'
				});
			})

			//4.4.4 & 4.4.2 에서 select ui 스크롤 안되는 증상
			var andV = navigator.userAgent.match(/Android\s+([\d\.]+)/)[1];
			if(andV == "4.4.4" || andV == "4.4.2"){
				$('select').each(function(){
					var sel = $(this);
					var btn = sel.parents('.content').find('.vari_btn');
					sel.parent('.select_wrap').find('ul').css('z-index','2000');
					if(btn.length > 0){
						btn.addClass('absol');
					}
				})
			}
		}

		/* 2017-12-15 added [ios, ios11] : when focus on inputbox of popup, it's avoid postion error */
		var ua = navigator.userAgent,
			iOS = /iPad|iPhone|ipod/.test(ua),
			iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_2/.test(ua);
		if(iOS && iOS11){
			$("body").addClass("iosBugFixPrompt");
		}
		$( function () {
			if($('html').hasClass('ios')){
				$('.layer_wrap input').on('focus', function(){
					//$('body').addClass('modal-open');
				});
				$('.layer_wrap input').on('blur', function(){
					//$('body').removeClass('modal-open');
				});
			}
		});
		/* //2017-12-15 added */

		// mobile content padding-bottom 체크 (모바일웹/앱)
		$('html.mobile .content').each(function(){
			//모바일웹
			if($('.m_web').length > 0){
				$(this).css('padding-bottom','0');
			}else{
			//앱
				if($('#footerMobile').length > 0){
					// footer가 없을 경우
					if($('#footerMobile').css("display") == undefined || $('#footerMobile').css("display") == "none"){
						$(this).css('padding-bottom','90px');
					}else{
					// footer가 있을 경우
						$(this).css('padding-bottom','0');
					}
				}else{
					$(this).css('padding-bottom','90px');
				}
			}
		});

		// 20181022 SR-559 추가
	    if($('.big_banner_slider').length > 0){
    		f_initBigBannerSlider();
	    }
		
		f_initDoubleDatePicker();
	});

	resize();
    // 2017-08-14 수정
    // $(window).resize(resize);
    //"resize.ui" namespace를 사용하여 event listener 등록전 등록해제 후 등록하여 중복 등록 방지
    $(window).off("resize.ui").on("resize.ui", resize);

	//웹일경우 컨텐츠 색상
	$('.content.web').closest('#wrap').css('background','#fff');

	// 꼭 확인하세요 펼침/닫침
	$('.list_dropdown dt button').each(function(){
		if(!$(this).closest('.list_dropdown').hasClass('no_move')){
			if(!$(this).closest('.list_dropdown').hasClass('caution')){
				if($(this).parent().hasClass('on')){
					if($(this).children().is('span.hdd')){
						$(this).children('span.hdd').text('펼쳐짐');
					}else if(!$(this).children().is('span.hdd')){
						$('<span class="hdd">펼쳐짐</span>').appendTo(this);
					}
				}else{
					if($(this).children().is('span.hdd')){
						$(this).children('span.hdd').text('닫힘');
					}else if(!$(this).children().is('span.hdd')){
						$('<span class="hdd">닫힘</span>').appendTo(this);
					}
				}
			}
		}
	});

	// 꼭 확인하세요 닫침펼침 기능 없을 경우
	$('.list_dropdown.caution dt button').each(function(){
		//$('<span class="hdd">펼쳐짐</span>').appendTo(this);
		if(!$(this).closest('.list_dropdown').hasClass('no_move')){
			$(this).parent().addClass('on');
			if(!$(this).children().is('span.hdd')){
				$('<span class="hdd">펼쳐짐</span>').appendTo(this);
			}
		}
	});

	//카드 리스트 좌우 보더 삭제
	$('.list_card').each(function(){
		var ea = $(this).find('li').size();
		if(ea%2 == 0){
			$(this).find('li:last').css('border-bottom','0').prev().css('border-bottom','0');
		}else{
			$(this).find('li:last').css('border-bottom','0');
		}
	});

	// 입력 input 클릭시 인풋데이터 삭제 ui 기능
	$('input[type="text"],input[type="tel"],input[type="email"]').each(function(){
		if(!$('.content').hasClass('web') && !$('.content').hasClass('pc_only')){
			if(!$(this).parent().hasClass('input_wrap') && !$(this).parents().hasClass('mouse_set')){
				if($(this).hasClass('mt10')){
					$(this).wrap('<div class="input_wrap mt10" />');
					$(this).removeClass('mt10');
					if($(this).attr('readonly') != 'readonly'){
						$('<a href="#n" class="btn_clear"><img src="/resource/img/btn/btn_input_x.png" alt="지우기"></a>').appendTo($(this).parent());
					}
				}else{
					$(this).wrap('<div class="input_wrap" />');
					if($(this).attr('readonly') != 'readonly'){
						$('<a href="#n" class="btn_clear"><img src="/resource/img/btn/btn_input_x.png" alt="지우기"></a>').appendTo($(this).parent());
					}
				}
			}
		}
	});


	// select ui 커스텀 함수정의
	$('select').each(function(){

		selectEvtHandlerId = $(this).attr('id');

		if(!$(this).hasClass('no_custom') && !$(this).closest('.report_menu_div').hasClass('report_menu_div')){
			if(!$(this).parent().is('.select_wrap')){
				//2016. 11. 23 PC에서만 볼 수 있는 화면에서도 적용, 문제 발생 시 공통 정창수 대리에게 알림 바람.
				//if(!$('.content').hasClass('web') && !$('.content').hasClass('pc_only')){
					var option = $(this).children('option'),
						opt_sel = $(this).children('option:selected').index(),
						opt_sel_txt = $(this).children('option:selected').text(),
						first_color = $(this).children('option:selected').attr('role'),
						title = $(this).attr('title'),
						a_txt = option.first().text(),
						max = $(this).children('option').size(),
						i = 0;

					if(opt_sel == -1){

						opt_sel = $(this).children('option[selected]').index();
						opt_sel_txt = $(this).children('option[selected]').text();
					}

					if($(this).is('[style]')){
						var style = $(this).attr('style');
						$(this).wrap('<div class="select_wrap selectClose" style="' + style + '" />'); // UI기능개선 2017-10-25
					}else{
						$(this).wrap('<div class="select_wrap selectClose" />'); // UI기능개선 2017-10-25
					}
					$('<a href="#n" class="selectButton" role="' + first_color + '" title="' + title + ' 옵션 레이어 있음" aria-haspopup="true" aria-expanded="false">' + opt_sel_txt + '</a>').insertAfter(this); //2016-09-13 웹접근성 수정  /* 2010530 SR-302 접근성 select : class="selectButton" aria-haspopup="true" aria-expanded="false" 속성추가 */
					$('<ul class="vis_hide" aria-hidden="true"  />').insertAfter($(this).next());
					option.clone(true).appendTo($(this).next().next('ul'));
					$(this).next().next('ul').children().each(function(){

						var selectedTxt = $(this).text();

						if($(this).index() == opt_sel){
							$(this).contents().unwrap().wrap('<li><a href="#n" role="' + first_color + '" selected="selected"></a></li>');
						}else{
							$(this).contents().unwrap().wrap('<li><a href="#n"></a></li>');
						}
					});

					$(this).css({
						display:'none'
					});
			}else{
				var option = $(this).children('option'),
				opt_sel = $(this).children('option:selected').index(),
				opt_sel_txt = $(this).children('option:selected').text(),
				first_color = $(this).children('option:selected').attr('role'),
				title = $(this).attr('title'),
				a_txt = option.first().text(),
				max = $(this).children('option').size(),
				i = 0;

				if(opt_sel == -1){

					opt_sel = $(this).children('option[selected]').index();
					opt_sel_txt = $(this).children('option[selected]').text();
				}

				$(this).next().replaceWith('<a href="#n" role="' + first_color + '" title="' + title + ' 옵션 레이어 있음">' + opt_sel_txt + '</a>'); //2016-09-13 웹접근성 수정
				$(this).next().next('ul').html('');
				option.clone(true).appendTo($(this).next().next('ul'));
				$(this).next().next('ul').children().each(function(){
					var selectedTxt = $(this).text();

					if($(this).index() == opt_sel){
						$(this).contents().unwrap().wrap('<li><a href="#n" role="' + first_color + '" selected="selected"></a></li>');
					}else{
						$(this).contents().unwrap().wrap('<li><a href="#n"></a></li>');
					}
				});
				$(this).css({
					display:'none'
				});
			}
		}
	});


	$(document).off('DOMNodeInserted','select').on('DOMNodeInserted','select',function(){
		$('.select_wrap ul').addClass('vis_hide').attr('aria-hidden','true');

		if(selectEvtHandlerId2 != '' && $(this).attr('id') == selectEvtHandlerId2
				&& (IS_IE || IS_IE11)){

			return false;
		}

		selectEvtHandlerId2 = $(this).attr('id');

		$(this).each(function(){
			$('.select_wrap ul').addClass('vis_hide').attr('aria-hidden','true');
			if(!$(this).hasClass('no_custom') && !$(this).closest('.report_menu_div').hasClass('report_menu_div')){
				if(!$(this).parent().is('.select_wrap')){
					//2016. 11. 23 PC에서만 볼 수 있는 화면에서도 적용, 문제 발생 시 공통 정창수 대리에게 알림 바람.
					//if(!$('.content').hasClass('web') && !$('.content').hasClass('pc_only')){
						var option = $(this).children('option'),
							opt_sel = $(this).children('option[selected]').index(),
							opt_sel_txt = $(this).children('option:selected').text(),
							first_color = $(this).children('option:selected').attr('role'),
							title = $(this).attr('title'),
							a_txt = option.first().text(),
							max = $(this).children('option').size(),
							i = 0;

						if(opt_sel == -1){

							opt_sel = $(this).children('option[selected]').index();
							opt_sel_txt = $(this).children('option[selected]').text();
						}

						if($(this).is('[style]')){
							var style = $(this).attr('style');
							$(this).wrap('<div class="select_wrap selectClose" style="' + style + '" />'); // UI기능개선 2017-10-25
						}else{
							$(this).wrap('<div class="select_wrap selectClose" />'); // UI기능개선 2017-10-25
						}
						$('<a href="#n" role="' + first_color + '" title="' + title + ' 옵션 레이어 있음">' + opt_sel_txt + '</a>').insertAfter(this); //2016-09-13 웹접근성 수정
						$('<ul />').insertAfter($(this).next());
						option.clone(true).appendTo($(this).next().next('ul'));
						$(this).next().next('ul').children().each(function(){
							var selectedTxt = $(this).text();

							if($(this).index() == opt_sel){
								$(this).contents().unwrap().wrap('<li><a href="#n" role="' + first_color + '" selected="selected"></a></li>');
							}else{
								$(this).contents().unwrap().wrap('<li><a href="#n"></a></li>');
							}
						});

						$(this).css({
							display:'none'
						});

				}else{
					var option = $(this).children('option'),
					opt_sel = $(this).children('option:selected').index(),
					opt_sel_txt = $(this).children('option:selected').text(),
					first_color = $(this).children('option:selected').attr('role'),
					title = $(this).attr('title'),
					a_txt = option.first().text(),
					max = $(this).children('option').size(),
					i = 0;

					if(opt_sel == -1){

						opt_sel = $(this).children('option[selected]').index();
						opt_sel_txt = $(this).children('option[selected]').text();
					}

					$(this).next().replaceWith('<a href="#n" role="' + first_color + '" title="' + title + ' 옵션 레이어 있음">' + opt_sel_txt + '</a>'); //2016-09-13 웹접근성 수정
					$(this).next().next('ul').html('');
					option.clone(true).appendTo($(this).next().next('ul'));

					$(this).next().next('ul').children().each(function(){
						if($(this).index() == opt_sel){
							$(this).contents().unwrap().wrap('<li><a href="#n" role="' + first_color + '" selected="selected"></a></li>');
						}else{
							$(this).contents().unwrap().wrap('<li><a href="#n"></a></li>');
						}


					});
					$(this).css({
						display:'none'
					});
				}
			}
		});
	});

	//모바일 메인 로그인 후 화면 - 프로필 list 사이즈 화면위치
	function me(){
		$('#auto_width .me').each(function(){
			var me = $(this);
			var width = $(this).width();
			var winW = $('.mainbox').width();
			var half = winW/2;
			var quarter = winW/4;

			if(!me.hasClass('logout')){
				me.parent('li').addClass('me_li');

				if($('#auto_width > li').length == 1){
					me.parents('ul').css('width','100%');
					me.parent('li').css('width','100%');
					var w = $('#auto_width .me').outerWidth();
					me.css({
						'margin-left': parseInt(-(w/2)),
						'left':'50%'
					});
				}else{
					me.parent('li').width(half + quarter);
					var w = $('#auto_width .me').outerWidth();
					me.css({
						'margin-left': parseInt(-(w/2)),
						'left':'65%'
					});
				}
			}
		});
	}me();
	$(window).resize(function(){
		me();
	})
	//로그인 화면 스타일
	$('.login_pc').each(function(){
		$(this).closest('#container').find('#lnb').hide();
		$(this).closest('#content').css('width','940px');
	});

	//좌우 목록리스트 반응형 정의
	$('.half_check').each(function(){
		var $list = $(this).find('ul li:last-child');
		var $listlen = $(this).find('ul li').length;
		var $all = $listlen%2;
		if(!$all == 0){
			$($list).css({'borderBottom':'1px solid #e0e0e1'});
			if($(window).width() > 699){
				$(this).find('ul li:last-child').after('<li></li>');
			}
		}
	});

	//스위치 버튼에 관한 접근성 스크립트
	$('.switch').each(function(){
		$(this).find('.base').attr('role','button');
		$(this).find('.on').siblings().attr('aria-hidden','true');
		var span_first = $(this).find('span').first(),
			i_pos = parseInt($(this).find('i').css('left').replace('px',''));
		if($(this).hasClass('onoff')){
			if(i_pos > 10){
				$(this).find('i').css({background:'#454d5b'}).next('span').attr('aria-hidden','true').css('color','#686e78').siblings('span:last').css('color','#fff').attr('aria-hidden','false');
				$(this).find('.base').attr('aria-pressed','false');
			}else{
				$(this).find('i').next().attr('aria-hidden','false').siblings('span').attr('aria-hidden','true');
				$(this).find('.base').attr('aria-pressed','true');
			}
		}else{
			var width = $(this).find('.base').width();
			if(span_first.hasClass('on')){
				$(this).find('i').css('left','3px');
			}else{
				$(this).find('i').css('left',(width/2)-3);
			}
		}
	});

	//예외처리 완료메시지 검색하여 태그삽입
	$('.complete_msg').each(function(){
		if(!$(this).is('dl')){
			$(this).wrapInner('<em class="lining" />');
		}
	});

	//모바일 사이드GNB 스타일 정의
	$('.gnb_m .nav .depth02 > li > ul > li > ul > li').each(function(){
		if(!$(this).children().is('ul')){
			$(this).children('a').css('background','none');
		}
	});

	//공통적용 클래스 변경
	$('.txt_title').addClass('cont_title').removeClass('txt_title');

	$('.timing strong').contents().unwrap();

	//예외처리 스탭박스 위에 .inbox있을시 스타일 정의
	$('.step_box').closest('.inbox').css({
		border:'0',
		boxShadow:'none'
	}).closest('#wrap').css('background','#fff').closest('body').css('background','#fff');


	// 20180615 bank.js 에서 이동
	// $(".guideArticle .tit").click(function (e) { // 꼭 확인하세요 Toggle
	// 	var _this = $(this);
    //     if(_this.parent().parent().hasClass('on')){
    //         _this.parent().parent().removeClass("on");
    //     }else{
    //         _this.parent().parent().addClass("on");
    //     };
    // });

	// 20180615 bank.js 에서 이동
    $(document).on('click','.periodTab li a',function(e){
		e.preventDefault();
    	var that = $(this);
    	
    	that.attr('title','메뉴 선택됨').parent().addClass('on').siblings().removeClass('on').children('a').removeAttr('title');
    	
        if(that.parent().hasClass('inBtn')){
            that.closest('.periodTab').next('div').show();
        }else{
        	that.closest('.periodTab').nextAll('div').hide();
            
            var role = that.data('role');
            
            if(role){
            	that.closest('.periodTab').siblings('*[data-role="ui-' + role + '"]').show();
            }
        }
	});
	
	// Class ON/OFF Style
	$('.SelectOnOff li').click(function(){ //20181113 SR-482
		var _this = $(this),
		_hasCheck = _this.parents('.selecPayList').find('.cardName.checkRadio');
	
		if( _this.hasClass('on')){
		

		}else{
			
			$('.SelectOnOff li').removeClass('on');
			$('.cardName.checkRadio').removeClass('checkOn');
			_this.addClass('on');	
			_hasCheck.addClass('checkOn');
		}
	});
	
	// if($('.selecPayList').children().first().is('h4')){
    // 	$('.selecPayList').click(function(){
    // 		$(this).children('h4').addClass('checkOn').parent().find('li').addClass('on');
    // 		$(this).siblings().children('h4').removeClass('checkOn').parent().find('li').removeClass('on');
    // 	});
    // }else{
    // 	$('.selecPayList > ul > li').click(function(){
    //     	$(this).addClass('on').children('h4').addClass('checkOn');
    //     	$(this).siblings().removeClass('on').children('h4').removeClass('checkOn');
    //     });
    // }


	//스탭 기본스타일 접근성 보강
	$('.step li').each(function(){
		if($(this).hasClass('current') && $(this).has('i').length < 1){
			$('<i class="hdd">현재 진행중</i>').appendTo($(this));
		}else if($(this).hasClass('check') && $(this).has('i').length < 1){
			$('<i class="hdd">진행완료</i>').appendTo($(this));
		}
	});
	$('.btn_radio01,.btn_radio').attr('role','radio');
	$('.btn_checkbox').attr('role','checkbox');
	$('.card_type01 > a > div').attr('role','text');
	$('.m_calendar').attr('tabindex','0').attr('title','달력');

	//체크박스 라디오 접근성 보강
	//20180529 SR-302 접근성 추가
	var _inputRadio = $('input[type="radio"]'),
		_radioLabel = _inputRadio.closest('label'),
		_inputCheck = $('input[type="checkbox"]').closest('label');
	
	_inputCheck.addClass('btn_checkbox');
	
	if(_radioLabel.hasClass('btn_radio') || _radioLabel.hasClass('btn_radio01')){
		//return false;
	}else{
		_radioLabel.addClass('btn_radio01');
	}

	$('input[type="checkbox"],input[type="radio"]').each(function(){
		$(this).attr('tabindex','-1');
		//20180316 tabindex 수정(왜 이런방식으로 했는지는 이해안됨)
		$(this).closest('label').attr('tabindex', '0');
		if($(this).is(':checked')){
			$(this).closest('label').attr('aria-checked','true');
		}
	});

	//FAQ 접근성 보강
	$('.list_dropdown.ico_qa dt button').each(function(){
		if(!$(this).children().first().is('em.hdd')){
			$('<em class="hdd">질문</em>').prependTo($(this));
		}
	});

	//FAQ 접근성 보강
	$('.list_dropdown.ico_qa dd.answer').each(function(){
		if(!$(this).children().first().is('.hdd')){
			$('<em class="hdd">답변</em>').prependTo($(this));
			//$(this).attr('tabindex','0'); // SR-302 접근성
		}
	});

	//휴대폰 인증서 서비스 상단 탭 접근성 보강
	$('.bank_list .on a').attr('title','선택됨');
	$('.bank_list a').each(function(){
		if($(this).text().length < 1){
			$(this).css('cursor','default').parent().attr('aria-hidden','true');
		}
	});

	//모바일 접근성 관련 세팅
	$('.module_bankbook .overview').attr('role','button').attr('aria-pressed','false');
	$('.module_bankbook.on .overview').attr('aria-pressed','true');
	$('.gnb_m').attr('aria-hidden','true');
	if(!$('body').hasClass('kbRnbMenu-open')) { $('.kbRnbMenu').attr('aria-hidden','true'); } // 20180502 SR-341 : 추가 // 20180601 SR-341 : 수정
	$('.step li,.step,.info_step,.info_step li,.card_step,.card_step li,.neoStep,.neoStep li').attr('role','text');
	$('.bank_list .on a,.nav .depth01 .on a').attr('title','선택됨');
	$('.low_text > a').attr('role','button');
	$('.certi_choice.list > ul > li > a > div').attr('role','text');

	//슬라이드 영역 접근성 보강
	$('.auto_sl > ul > li').each(function(){
		if(!$(this).hasClass('on')){
			$(this).attr('aria-hidden','true');
		}
	});

	//[꼭 확인하세요] 첫번째 버튼에 접근성 보강
	$('.list_dropdown.caution.no_move dt:first-child').attr('class','on').find('button').attr({
		'role':'text',
		'tabindex':'-1'
	});
	
	$(document).trigger("ui-ended");
}

//#wrap 유무 체크후 style속성 제거
function wrap_height_resize(){
	var _scrollUnbind = $('#wrap');

	if(_scrollUnbind.length > 0){
		_scrollUnbind.removeAttr('style');
	}
}

/*
	click 전체 함수 선언
*/

function click(){

	//페이징 아이템 갯수 체크하여 텍스트 삽입 : 접근성
	function pagingCheck(){
		var pageTotal = $('.paging > *').size();
		$('.paging > *').each(function(i){
			if($(this).hasClass('on')){
				$(this).text('총 ' + pageTotal + '개의 슬라이드 중 ' + (i +1) + '번째 슬라이드 활성화')
			}else{
				$(this).text('총 ' + pageTotal + '개의 슬라이드 중 ' + (i +1) + '번째 슬라이드')
			};
		});
	};pagingCheck();


	// layer_x 버튼 클릭시 실행
	$(document).on('click','.layer_x',function(){
		wrap_height_resize();
		var ly_cont = $(this).parent('.layer_cont');
		if(ly_cont.attr('tabindex')){
			ly_cont.removeAttr('tabindex');
		}
		$('#dim').fadeOut();

		$('.tab_type01').each(function(){
			var ea = $(this).children().size(),
				content = $(this).closest('.content').width(),
				inbox = $(this).width();
			if($(this).parent().hasClass('inbox')){
				$(this).children().css('width',inbox/ea);
			}else{
				$(this).children().css('width',content/ea);
			}
			$(this).find('.on').children('a').attr('title','메뉴 선택됨');
			$(this).find('.on').children('a').attr('href','#n');
		});

	});

	//라디오버튼 클릭시 라벨에 있는 네임 인풋과 통일
	// $(document).on('click','.btn_radio,.btn_radio01',function(){
	// 	var name = $(this).find('input').attr('name');
	// 	$('input[name="'+name+'"]').closest('label').attr('aria-checked','false'); //20180529 SR-302 접근성
	// 	$(this).closest('label').attr('aria-checked','true');
	// });

	//라디오버튼에 클릭시 레이블에 접근성 속성 추가
	$(document).on('change','input[type=radio]',function(){

		$('input[type=radio]').each(function(){
			
			this.checked = $(this).is(':checked');
			this.closest = $(this).closest('label');

			if(this.checked){
				this.closest.attr('aria-checked','true');
			}else{
				this.closest.attr('aria-checked','false');
			}
		});
	});


	//체크박스에 클릭시 레이블에 접근성 속성 추가
	$(document).on('change','.btn_checkbox input',function(){

		$('.btn_checkbox input').each(function(){
			
				this.checked = $(this).is(':checked');
				this.closest = $(this).closest('label');

				if(this.checked){
					this.closest.attr('aria-checked','true');
				}else{
					this.closest.attr('aria-checked','false');
				}
			// if($(this).is(':checked')){
			// 	$(this).closest('label').attr('aria-checked','true');
			// }else{
			// 	$(this).closest('label').attr('aria-checked','false');
			// }

		});

	});

	//인풋타입에 엔터나 스페이스 키다운시 인풋 클릭이벤트 실행
	 $(document).on('keydown','.btn_checkbox,.btn_radio01,.btn_radio',function(e){
		if(e.keyCode!=13 && e.keyCode!=32)
					return;
		$(this).find('input').trigger('click');
	 });

	//체크박스 체크,체크아웃 커스텀 BG 변경
	$(document).on('click','.mouse_set .btn_checkbox,.mouse_write01 .btn_checkbox,.solo_label .btn_checkbox',function(){
		if($(this).find('input[type="checkbox"]').is(':checked')){
			$(this).children('span').css({
				background:'url(/resource/img/bg/bg_checkbox_on.png) no-repeat left center',
				backgroundSize:'18px'
			});
		}else{
			$(this).children('span').css({
				background:'url(/resource/img/bg/bg_checkbox.png) no-repeat left center',
				backgroundSize:'18px'
			});
		}
	});

	//탭 영역 화면 접근성 보강
	$(document).on('click','.tab_type01 a',function(){
		$(this).attr('title','메뉴 선택됨').parent().addClass('on').siblings().removeClass('on').children('a').removeAttr('title');
	});

	//달력 닫기 버튼 클릭시
	$(document).on('click','.calendar_wrap .close',function(){
		$(this).closest('.calendar_wrap').fadeOut();
	});

	//공통 : 셀렉트박스 기능 정의
	$(document).on('click','.select_wrap > a',function(){
		var b_width = $(window).width(),
			c_height = $('#wrap').height(),
			offset = $(this).offset().top,
			result = c_height - offset,
			isAndroid = navigator.userAgent.toLowerCase().indexOf('android');
		if(!$(this).closest('.layer_cont').hasClass('layer_cont')){
			if(result < 280){
				if(b_width <= 699){
					var nextHeight = $(this).next().height() + 7;
					if(nextHeight > 46){
						//$(this).next().css('top',-nextHeight);
					}else{
						$(this).next().css('top','45px');
					}
				}else{
					$(this).next().css('top','45px');
				}
			}
		}
		if($(this).next().hasClass('vis_hide')){
			$('.select_wrap > ul').removeClass('vis_show').addClass('vis_hide').attr('aria-hidden','true').parent().removeClass("selectOpen").addClass("selectClose") // UI기능개선 2017-10-25
			$('.select_wrap > .selectButton').attr('aria-expanded','false'); /* 20180530 SR-302 접근성 select : 추가 */
			$(this).next('ul').removeClass('vis_hide').addClass('vis_show').attr('aria-hidden','false').parent().removeClass("selectClose").addClass("selectOpen") // UI기능개선 2017-10-25
			$(this).attr('aria-expanded','true'); /* 20180530 SR-302 접근성 select : 추가 */
			var oh = $(this).next().children('li').outerHeight(),
				soh = $(this).next().find('a[selected]').parent().index() * oh;
		}else{
			$('.select_wrap > ul').removeClass('vis_show').addClass('vis_hide').attr('aria-hidden','true').parent().removeClass("selectOpen").addClass("selectClose") // UI기능개선 2017-10-25
			$('.select_wrap > .selectButton').attr('aria-expanded','false'); /* 20180530 SR-302 접근성 select : 추가 */
			$(this).next('ul').removeClass('vis_show').addClass('vis_hide').attr('aria-hidden','true').parent().removeClass("selectOpen").addClass("selectClose") // UI기능개선 2017-10-25
			$(this).attr('aria-expanded','false'); /* 20180530 SR-302 접근성 select : 추가 */
		}
	});

	//셀렉트박스 기능 정의 4.4.2 대응
	$(document).on('click','.select_wrap li a',function(){
		var txt = $(this).text(),
			color = $(this).attr('role'),
			idx = $(this).parent().index();

		$(this).closest('.select_wrap').children('a').text(txt).attr('tabindex','0').focus();
		
		if( color == 'disable'){
			
			$(this).closest('.select_wrap').children('a').attr('role', 'disable')
			
		}else{
			$(this).closest('.select_wrap').children('a').attr('role', '');
		}
		$(this).closest('.select_wrap').children('a').attr('aria-expanded','false'); /* 20180530 SR-302 접근성 select : 추가 */
		$(this).closest('.select_wrap').children('select').children('option').removeAttr('selected').eq(idx).prop('selected','selected').change();
		$(this).attr('selected','selected').parent().siblings().children().removeAttr('selected');
		$(this).parent().parent().removeClass('vis_show').addClass('vis_hide').attr('aria-hidden','true').parent().removeClass("selectOpen").addClass("selectClose on"); // UI기능개선 2017-10-25

		
	});
	

	$(document).on('click','.select_wrap li:first-child a',function(){
		$(this).parent().parent().parent().removeClass("selectOpen on"); // UI기능개선 2017-10-25
	});

	$(document).on('click','.fstDefault .select_wrap li:first-child a',function(){
		$(this).parent().parent().parent().addClass("on"); // UI기능개선 2017-10-25
	});

	//프로필 사진 있는 이체리스트 기능 정의
	$(document).on('click','.face_list .face_item > a',function(){
		if(!$(this).closest('.face_item').hasClass('no_pub')){
			if($(this).parent().hasClass('on')){
				$(this).parent().removeClass('on');
			}else{
				$(this).parent().addClass('on').parent().siblings().find('.face_item').removeClass('on');
			}
		}
	});

	//아코디언 영역 기능 정의
	$(document).on('click','.list_dropdown dt button, .accordListItems dt button, .dropdown_type dt button',function(){ /* 20181015 SR-507 */
		var that = $(this);
		if(!$(this).closest('.list_dropdown, .accordListItems').hasClass('no_move')){
			
			if($(this).parent().hasClass('on')){
				$(this).parent().removeClass('on');
				$(this).children('span.hdd').text('닫힘');
			}else{
				$('.list_dropdown dt, .accordListItems dt, .dropdown_type dt').removeClass('on');
				$(this).closest('.list_dropdown, .accordListItems').find('dt').removeClass('on').find('span.hdd').text('닫힘');
				$(this).parent().addClass('on');
				$(this).children('span.hdd').text('펼쳐짐');
			}

		}
		//Anchor (주담대)
		// $( 'html, body' ).scrollTop( $( this ).parents( 'dt' ).offset().top );
		// if ( $( '.layer_wrap' ).is( ':visible' ) ) {
		// 	$( '.layer_body' ).scrollTop( $( this ).parents( 'dt' ).offset().top - $( '.layer_top' ).outerHeight() - $( '.layer_cont' ).offset().top + $( '.layer_body' ).scrollTop() );
		// }
		//Anchor (주담대)
	});

	//아코디언 더보기 클릭후 하단 영역 노출 기능
	$(document).on('click','.accordion_info .more',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).html('<i class="hdd">상세내용</i>더보기');
			$(this).parent().prev('.card_type01').removeClass('on');
			$(this).css({
				background:'url(/resource/img/bg/bg_darr_arrow.png) no-repeat right center',
				backgroundSize:'10px'
			});
		}else{
			$('.accordion_info').removeClass('on').find('.more').html('<i class="hdd">상세내용</i>더보기');
			$(this).parent().addClass('on');
			$(this).html('<i class="hdd">상세내용</i>닫기');
			$(this).parent().prev('.card_type01').addClass('on').find('.btns a:first').focus();
			$(this).css({
				background:'url(/resource/img/bg/bg_uarr_arrow.png) no-repeat right center',
				backgroundSize:'10px'
			});
		}
	});

	//카드 타입 버튼 클릭시 기능 및 접근성 추가
	$(document).on('click','.card_type01.btn > a',function(){
		if($(this).closest('.btn').children('.btns').is(':visible')){
			$(this).closest('.btn').children('.btns').hide();
			$(this).attr('title','상세내용 펼치기');
		}else{
			$('.card_type01.btn').children('.btns').hide()
			$(this).closest('.btn').children('.btns').show();
			$('.card_type01.btn > a').attr('title','상세내용 펼치기');
			$(this).attr('title','상세내용 닫기');
		}
	});

	//카드 타입 버튼 클릭시 기능 및 접근성 추가
	var card_b = $('.card_type01.btn');
	if(card_b.length > 0){
		card_b.each(function(){
			var tt = $(this);
			if(tt.hasClass('on')){
		 		$(this).find('>a').attr('title','상세내용 닫기');
		 	}else{
		 		$(this).find('>a').attr('title','상세내용 펼치기');
		 	}
		})
	}

	//공통 레이어팝업 기능
	var st;
	$(document).on('click','.btn_layer',function(){
		var href = $(this).attr('href'),
			b_height = $(window).height(),
			b_width = $(window).width();
		$('#dim,.layer_wrap').fadeIn();
		$(href).css('display','block').focus();

		var layer_cont = $('.layer_cont.full:visible').length;
		if($('html').hasClass('mobile')){
			if(layer_cont>0 && $('#wrap').length>0){
				$('#wrap, .pageBlockDiv').css('overflow','hidden').height(b_height);
			}
		}
		//layer_body();
		//layer_top();
		if(layer_btn != null)	layer_btn = $(this);
	});

	//튜토리얼 가이드 건너뛰기 기능
	$(document).on('click','#dim,.btn_popx,.qg_pass',function(){
		if($('.calendar_wrap').is(':hidden')){
			$('#dim,.layer_wrap,.layer_cont').fadeOut();
			$('.gnb_m').animate({right:'-90%'});
			$('.layer_x').parent().fadeOut();
			$('.more_menu,.share .menu_more').fadeOut();
			$('html,body,#wrap').removeAttr('style');//#dim 사라질 때 반드시 넣어줄 것(스크롤 안되는 현상 조치)
			$('body').scrollTop(st);
		}else{
			$('.calendar_wrap').fadeOut();
			$('html,body,#wrap').removeAttr('style');//#dim 사라질 때 반드시 넣어줄 것(스크롤 안되는 현상 조치)
			$('body').scrollTop(st);
		}
		if(layer_btn != null)	layer_btn.focus();
	});

	//달력 날짜 입력란 클릭시 달력팝업 노출
	$(document).on('click','.btn_calender',function(){
		$(this).next().show().focus().children('#dim').show();
		if(layer_btn != null)	layer_btn = $(this);
	});

	//달력팝업 닫기 클릭 정의
	$(document).on('click','.calendar_wrap .close',function(){
		$(this).closest('.calendar_wrap').fadeOut();
		if(layer_btn != null)	layer_btn.focus();
	});

	//리스트레이어팝업 기능 정의
	$(document).on('click','.more .btn_more',function(){
		$('#dim').show();
		if($('html').hasClass('ios')){
			$(this).next('.more_menu').show(0,function(){
				if(!$(this).children(':first').is('p')){
					$('<p style="position:absolute; color:transparent; z-index:1; font-size:9px" tabindex="0">레이어팝업입니다.</p>').prependTo($(this));
				}
				$(this).children('p').focus();
			});
		}else{
			$(this).next('.more_menu').show().attr('tabindex','0').focus();
		}
		if(layer_btn != null)	layer_btn = $(this);
	});

	//상품상세 우측상단 서브 레이어 노출
	$(document).on('click','.share > a',function(){
		$('#dim').show();
		$(this).closest('.share').find('.menu_more').show();
		if($('html').hasClass('ios')){
			$('.menu_more strong').attr({
				'tabindex':'0',
				'role':'text'
			}).focus();
		}else{
			$('.menu_more').attr('tabindex','0').focus();
		}
		if(layer_btn != null)	layer_btn = $(this);
	});

	// .more_menu 레이어팝업 닫기
	$(document).on('keydown',function(e){
		if(e.keyCode === 27){
			if($('.more_menu,.share .menu_more').is(':visible')){
				$('#dim,.more_menu,.share .menu_more').fadeOut();
				if(layer_btn != null)	layer_btn.focus();
			}
		}
	});

	//모듈타입 더보기 메뉴 기능
	$(document).on('click','.more_menu a,.menu_more a',function(){
		$('#dim').fadeOut();
		$(this).closest('.more_menu').hide();
		$(this).closest('.menu_more').hide();
		if(layer_btn != null)	layer_btn = $(this);

		if($(this).parent('.more_close').hasClass('more_close')){
			if($(this).closest('ul').prev().is('strong')){
				$(this).closest('.share').children('a').focus();
			}else{
				$(this).parents('.more_menu').prev('.btn_more').focus();
			}
		}
	});

	//모듈타입 더보기
	$(document).on('click','.module_bankbook .overview',function(){
		if($(this).closest('.module_bankbook').hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).attr('aria-pressed','false');
		}else{
			$('.module_bankbook:not(".to_be")').removeClass('on').find('.overview').attr('aria-pressed','false');
			$(this).parent().addClass('on');
			$(this).attr('aria-pressed','true');
		}
	});

	//모듈타입 하단 기능 정의
	$('.module_bankbook .etc .action').each(function(){
		var txt;
		$(this).on('click',function(){
			if(!$(this).hasClass('no_move')){
				if($(this).siblings('.detail').is(':hidden')){
					$('.module_bankbook:not(".to_be")').removeClass('on');
					$('.module_bankbook:not(".to_be")').find('.detail').slideUp();
					$(this).closest('.module_bankbook').addClass('on');
					$(this).parent('.etc').attr('tabindex','0').focus();
					$(this).parent().find('.detail').slideDown();
					$('.module_bankbook .action').removeClass('on').children('span').text('더보기');
					$(this).children('span').text('닫기');
					$(this).addClass('on');
				}else{
					$(this).parent().find('.detail').slideUp();
					$(this).parent('.etc').attr('tabindex','-1');
					$(this).focus();
					$(this).children('span').text('더보기');
					$(this).removeClass('on');
				}
			}
		});
	});

	//버튼 슬라이드토글 접근성
	$(document).on('click','.ac_view',function(){
		$(this).toggleClass('on');
		$(this).parent().siblings('.detail').stop().slideToggle();
		$(this).text()  == '열기' ? $(this).text('닫기') : $(this).text('열기');
	})

	//토글스위치 정의
	$(document).on('click','.switch .base',function(){
		var left = parseInt($(this).children('i').css('left').replace('px',''));
		var that = $(this);//.switch
		var baseA = $(this, '> a');//a.base

		if(!$(this).closest('.gage_box').hasClass('gage_box')){
			if($(this).parent().hasClass('onoff')){
				baseA.toggleClass('false');
				if(!$(this).parent().hasClass('disable')){
					if(baseA.hasClass('false')){
						$(this).children('i').animate({left:'35px'},100,'linear',function(){
							$(this).css('background','#454d5b');
							that.attr('aria-pressed','false').children().last().css('color','#fff').attr('aria-hidden','false').siblings('span').css('color','#686e78').attr('aria-hidden','true');
						});
					}else{
						$(this).children('i').animate({left:'3px'},100,'linear',function(){
							$(this).css('background','#e9596f');
							that.attr('aria-pressed','true').children('span').removeAttr('style').last().prev('span').css('color','#fff').attr('aria-hidden','false').siblings('span').css('color','#686e78').attr('aria-hidden','true');
						});
					}
				}else{
					$(this).children('i').animate({left:'3px'},0,'linear');
				}
			}else{
				var width = $(this).width();
				if(left == 3){
					$(this).children('i').animate({left:(width/2)-3},100,'linear');
				}else{
					$(this).children('i').animate({left:'3px'},100,'linear');
				}
				$(this).children('.on').attr('aria-hidden','true').removeClass('on').siblings('span').addClass('on').removeAttr('aria-hidden');
			}
		}
	});

	//account_list 다음 리스트 보기
	$(document).on('click','.account_more',function(){
		var b_width = $(window).width();
		$(this).next('.account_list').show();
		//$('#dim').show();
		if(b_width > 699);
		layer_btn = $(this);
	});

	//account_list 닫기 정의
	$(document).on('click','.account_list .close',function(){
		$(this).closest('.account_list').hide();
		$('#dim').hide();
		layer_btn.focus();
	});

	//fake_table 안에서의 아코디언 정의
	$(document).on('click','.toggle_li a',function(){
		if($(this).next('.next_detail').is(':hidden')){
			$('.next_detail').slideUp();
			$(this).next('.next_detail').slideDown();
		}else{
			$('.next_detail').slideUp();
		}
	});

	//유사 fake_table 클래스 제어
	$(document).on('click','.etc_except dd > label.btn_radio01, .etc_except p label.btn_radio01',function(){
		var idx = $(this).index();
		$(this).closest('.etc_except').find('.except_view').removeClass('on').eq(idx).addClass('on').closest('.except_view_wrap').show();
	});

	//슬라이드 next클릭시 함수 정의
	$(document).on('click','.detail_sl .next',function(){
		var b_width = $(this).closest('.detail_sl').width(),
			max = $('.detail_sl').find('.sl_con_div').size();
		$('.detail_sl > ul').stop().animate({left:-b_width},function(){
			$(this).children('li:first').appendTo($(this));
			$(this).stop().animate({left:'0px'}, 0, function(){
				if($('.mainbox .paging span:last').hasClass('on')){
					$('.mainbox .paging span').first().addClass('on').siblings().removeClass('on');
				}else{
					$('.mainbox .paging span.on').next().addClass('on').siblings().removeClass('on');
				}
			});
		});
	});

	//슬라이드 prev클릭시 함수 정의
	$(document).on('click','.detail_sl .prev',function(){
		var b_width = $(this).closest('.detail_sl').width(),
			max = $('.detail_sl > ul > li').size();
		$('.detail_sl > ul').stop().animate({left:-b_width},0,function(){
			$(this).children('li:last').prependTo($(this));
			$(this).stop().animate({left:'0px'});
			if($('.mainbox .paging span:first').hasClass('on')){
				$('.mainbox .paging span').last().addClass('on').siblings().removeClass('on');
			}else{
				$('.mainbox .paging span.on').prev().addClass('on').siblings().removeClass('on');
			}
		});
	});

	//튜토리얼 스탭2 함수 정의
	function step2_play(){
		$('.step2_window .last i').text(200).css({left:-10, opacity:0});
		$('.step2_window .go_cash i').text(300).css({left:-10, opacity:0});

		$('.step2_window .last i').stop(false).delay(620).animate({left:0, opacity:1},600, function(){
			$('.step2_window .go_cash i').stop(false).delay(50).animate({left:0, opacity:1},400);
		})
	}

	//튜토리얼 스탭3 함수 정의
	function step3_play(){
		$('.step3_window .play').css({width:0});
		$('.step3_window .left i').text(0);
		$('.step3_window .right i').text(500);

		$('.step3_window .play').stop(true, false).delay(700).animate({width:37+ "%"}, 600, function(){
			$('.step3_window .left i').text(200);
			$('.step3_window .right i').text(300);
			$('.step3_window .play').delay(900).animate({width:63+ "%"}, 600, function(){
				$('.step3_window .left i').text(300);
				$('.step3_window .right i').text(200);
			})
		})
	}

	//튜토리얼 스탭4 함수 정의
	function step4_play(){
		$('.ok_wd').hide();
		$('.txt2, .cout02').hide();
		$('.txt1, .cout01').show();
		$('.step4_window .static_ground').css({height:40, top:0},'fast')
		$('.step04 .top_title').show();
		$('.step04 .top_title_ok').hide();

		var count30 = 30;

		function timeGo(){
			--count30;
			$('.cut_io .cout01 span').text(count30);
		}
		var onTimeStart = setTimeout(function(){
			var countStart = setInterval(function(){
				timeGo()
				if(count30 == 0){
					clearInterval(countStart)
					$('.ok_wd').fadeIn(800);
					$('.step4_window .static_ground').animate({height:50, top:-5})
					$('.txt1').fadeOut(function(){
						$('.txt2').fadeIn();
					});
					$('.cout01').fadeOut(function(){
						$('.cout02').fadeIn()
						$('.cut_io .cout01 span').text(30);
					})
					$('.step04 .top_title').fadeOut(function(){
						$('.step04 .top_title_ok').fadeIn();
					})
				}
			}, 30);
		}, 1200)
	}

	//퀵가이드 접근성 보강
	$('.quick_guide_sl li:first-child').attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
	$('.qg_control .paging span, .qg_control .paging a').attr('aria-hidden', 'true');
	$('.qg_control .paging span.on, .qg_control .paging a.on').attr('aria-hidden', 'false');

	//퀵가이드 왼쪽 스와이프시 기능 정의
	$(document).on('swipeleft','.quick_guide_sl ul li',function(){
		$('.quick_guide_sl ul li').stop(true,true);
		pagingCheck();
		if(!$('.qg_control .paging span').last().hasClass('on')){
			$('.quick_guide_sl a.prev').show();
			$('.quick_guide_sl ul li.on').animate({left:'-100%'});
			$('.quick_guide_sl ul li.on').next().animate({left:'100%'},0,function(){
				$(this).animate({left:'0%'},function(){
					$(this).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true')
				}).addClass('on').siblings().removeClass('on');

				$('.qg_control .paging .on').removeClass('on').attr('aria-hidden', 'true').next().addClass('on').attr('aria-hidden', 'false');

				if($('.qg_control .paging span').last().hasClass('on')){
					$('.qg_start').show();
					$('.quick_guide_sl a.next').hide();
				}
			});
		}

		if($('.step02').hasClass('on')){
			step2_play();
		}
		if($('.step03').hasClass('on')){
			step3_play();
		}
		if($('.step04').hasClass('on')){
			step4_play();
		}
	});

	//퀵가이드 오른쪽 스와이프시 기능 정의
	$(document).on('swiperight','.quick_guide_sl ul li',function(){
		$('.quick_guide_sl ul li').stop(true,true);
		pagingCheck();
		if(!$('.qg_control .paging span').first().hasClass('on')){
			$('.quick_guide_sl a.prev').show();
			$('.quick_guide_sl ul li.on').animate({left:'100%'});
			$('.quick_guide_sl ul li.on').prev().animate({left:'-100%'},0,function(){
				$(this).animate({left:'0%'},function(){
					$(this).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true')
				}).addClass('on').siblings().removeClass('on');

				$('.qg_control .paging .on').removeClass('on').attr('aria-hidden', 'true').prev().addClass('on').attr('aria-hidden', 'false');

				if(!$('.qg_control .paging span').last().hasClass('on')){
					$('.qg_start').hide();
					$('.quick_guide_sl a.next').show();
				}
				if($('.qg_control .paging span').first().hasClass('on')){
					$('.quick_guide_sl a.prev').hide();
				}
			});
		}

		if($('.step02').hasClass('on')){
			step2_play()
		}
		if($('.step03').hasClass('on')){
			step3_play()
		}
		if($('.step04').hasClass('on')){
			step4_play()
		}
	});

	//퀵가이드 next클릭시 애니메이션중인 요소 애니메이션 완료후 함수호출
	$(document).on('click','.quick_guide_sl a.next',function(){
		$('.quick_guide_sl ul li').stop(true,true);
		$('.quick_guide_sl ul li.on').swipeleft();
	});

	//퀵가이드 prev클릭시 애니메이션중인 요소 애니메이션 완료후 함수호출
	$(document).on('click','.quick_guide_sl a.prev',function(){
		$('.quick_guide_sl ul li').stop(true,true);
		$('.quick_guide_sl ul li.on').swiperight();
	});

	// //인풋 입력타입에 포커스시 초기화버튼 보임
	// $(document).on('focus','input[type="text"],input[type="tel"],input[type="email"],input[type="number"],input[type="search"]',function(){
	// 	$(this).next('.btn_clear').show();
	// 	$(this).next('.btn_clear').addClass('active');//외환 버튼 노출용
	// });
	// $(document).on('focus','.mobile .unBind input[type="text"], .mobile .unBind input[type="tel"], .mobile .unBind input[type="email"], .mobile .unBind input[type="number"], .mobile .unBind input[type="search"]',function(){ /* 삭제버튼 모바일 제거 */
	// 	$(this).next('.btn_clear').hide();
	// 	$(this).next('.btn_clear').removeClass('active');//외환 버튼 노출용
	// });

	// //인풋 입력타입에 X버튼 클릭시 입력된 텍스트 삭제후 포커싱
	// $(document).on('click','.btn_clear',function(){
	// 	$(this).closest('.input_wrap').find('input').val('');
	// 	$(this).hide().prev().focus();
	// });


	
	//20180321 input type focus function 
	//인풋 입력타입에 포커스시 초기화버튼 보임
	$(document).on('focus', 'input[type="text"],input[type="tel"],input[type="email"],input[type="number"],input[type="search"]', function(){
		$('input[type="text"],input[type="tel"],input[type="email"],input[type="number"],input[type="search"]').next('a.btn_clear').hide().removeClass('active');
		$(this).next('a.btn_clear').show().addClass('active');
	});

	$(document).on('focus', '.mobile .unBind input[type="text"], .mobile .unBind input[type="tel"], .mobile .unBind input[type="email"], .mobile .unBind input[type="number"], .mobile .unBind input[type="search"]', function(){
		$(this).next('.btn_clear').hide().removeClass('active');//외환 버튼 노출용;
	});

	$(document).on('click','.btn_clear',function(){
		var _this = $(this);
				
		_this.closest('.input_wrap').find('input').val('');
		_this.hide().prev().focus();
	});
	// $(function inputFocusFunction(){

	// 	var _inputBox = $('input[type="text"],input[type="tel"],input[type="email"],input[type="number"],input[type="search"]'),
	// 		_inputBox2 = $('.mobile .unBind input[type="text"], .mobile .unBind input[type="tel"], .mobile .unBind input[type="email"], .mobile .unBind input[type="number"], .mobile .unBind input[type="search"]'),
	// 		_inputDelBtn = $('a.btn_clear');

	// 		_inputBox.off('focus').on('focus', function(){
	// 			_inputBox.next('a.btn_clear').hide().removeClass('active');
				
	// 			$(this).next('a.btn_clear').show().addClass('active');
				
	// 		});

	// 		//사용용도 잘 모르겠으나, 기존에 있는 소스이기에 살림
	// 		_inputBox2.off('focus').on('focus', function(){

	// 			$(this).next('.btn_clear').hide().removeClass('active');//외환 버튼 노출용;
	// 		});

	// 		//input type focusing delete btn function
	// 		_inputDelBtn.off().on('click', function(){

	// 			var _this = $(this);
				
	// 			_this.closest('.input_wrap').find('input').val('');
	// 			_this.hide().prev().focus();
	// 		});

	// });
	
	//라디오박스 블럭 스타일 접근성 추가 및 여백제어
	$('<i class="hdd">상세내용 닫힘</i>').appendTo($('.list_choice > li .row_input label'));
	$(document).on('click','.row_input input',function(){
		if($(this).is(':checked')){
			$(this).closest('.row_input').find('.hdd').text('상세내용 펼쳐짐')
		}else{
			$(this).closest('.row_input').find('.hdd').text('상세내용 닫힘')
		}
		$('.row_input').removeAttr('style').next().hide();
		$(this).closest('.row_input').css({
			paddingBottom:'10px',
			marginBottom:'10px',
			borderBottom:'1px solid #bfcbe0'
		}).next().show();
	});

	//module_bankbook 순셔변경 기능 정의
	$(document).on('click','.module_bankbook .move_control .down',function(){
		$(this).closest('.module_bankbook').addClass('on').parent().insertAfter($(this).closest('.module_bankbook').parent('li').next('li'));
		$(this).closest('.module_bankbook').parent('li').siblings().find('.on').removeClass('on');
		$('.module_bankbook.move').children('em.hdd').remove();
		$('<em class="hdd">선택됨</em>').prependTo('.module_bankbook.move.on');
	});
	$(document).on('click','.module_bankbook .move_control .up',function(){
		$(this).closest('.module_bankbook').addClass('on').parent().insertBefore($(this).closest('.module_bankbook').parent('li').prev('li'));
		$(this).closest('.module_bankbook').parent('li').siblings().find('.on').removeClass('on');
		$('.module_bankbook.move').children('em.hdd').remove();
		$('<em class="hdd">선택됨</em>').prependTo('.module_bankbook.move.on');
	});

	//gnb 각 섹션의 높이 제어
	$(document).on('mouseenter focus','.gnb .inner > ul > li > a',function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
		var fh = $(this).next().children().children().first().height(),
			li = $(this).next().children().children(),
			size = $(this).next().children().children().size(),
			row = Math.ceil(size/6),
			i, o;

		for(i = 0; i < row; i++){
			switch(i){
				case 0 : i = 0; break;
				case 1 : i = 6; break;
				case 2 : i = 12; break;
				case 3 : i = 18; break;
				case 4 : i = 24; break;
			}

			for(o = 0; o < 6; o++){
				var ch = $(this).next().children().children().eq(i+o).height();
				if(fh < ch){
					fh = ch;
				}
			}

			switch(i){
				case 0 :
					li.each(function(){
						if($(this).index() < 6){
							$(this).height(fh);
						}
					});
					i = 0;
				break;
				case 6 :
					li.each(function(){
						if(6 <= $(this).index() && $(this).index() < 12){
							$(this).height(fh);
						}
					});
					i = 1;
				break;
				case 12 :
					li.each(function(){
						if(12 <= $(this).index() && $(this).index() < 18){
							$(this).height(fh);
						}
					});
					i = 2;
				break;
				case 18 :
					li.each(function(){
						if(18 <= $(this).index() && $(this).index() < 24){
							$(this).height(fh);
						}
					});
					i = 3;
				break;
				case 24 :
					li.each(function(){
						if(24 <= $(this).index() && $(this).index() < 30){
							$(this).height(fh);
						}
					});
					i = 4;
				break;
			}
			fh = 0;
		}
	});

	//GNB 비활성화 정의
	$(document).on('mouseenter','#container, .header.pc .top',function(){
		$('.gnb .inner li').removeClass('on');
	});

	//LNB 기능 정의
	$(document).on('click','.lnb a',function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
	});

	
	$(document).on('click','.header.mobile .menu, .header.mobile .gnbFold, [data-kbRnbMenu-toggle="open"]',function(){ // 20180502 SR-341 : 셀렉터 추가
		var b_height = $(window).height();
		$('#dim').insertBefore('.gnb_m').fadeIn();
		$('.gnb_m').animate({right:'0%'}).removeAttr('aria-hidden');
		$('html, body, #wrap').css({
			position:'fixed',
			width:'100%',
			height:b_height,
			overflow:'hidden'
		});
		$('body').addClass('kbRnbMenu-open'); // 20180502 SR-341 : 추가 // 20180601 SR-341 : 수정
		$('.kbRnbMenu').removeAttr('aria-hidden'); // 20180502 SR-341 : 추가
		$('#container, #footer').attr('aria-hidden','true'); // 20180601 SR-341 : 추가
	});

	//gnb 모바일 닫힘 클릭시 기능 정의
	$(document).on('click','.gnb_m .close, [data-kbRnbMenu-toggle="close"]',function(){ // 20180502 SR-341 : 셀렉터 추가
		$('#dim').fadeOut(function(){
			$(this).insertAfter('#footer');
		})
		$('html,body,#wrap').removeAttr('style');//#dim 사라질 때 반드시 넣어줄 것(스크롤 안되는 현상 조치)
		$('body').scrollTop(st);
		$('.gnb_m').animate({right:'-90%'}).attr('aria-hidden','true');

		$('body').removeClass('kbRnbMenu-open'); // 20180502 SR-341 : 추가 // 20180601 SR-341 : 수정
		$('.kbRnbMenu').attr('aria-hidden','true'); // 20180502 SR-341 : 추가
		$('#container, #footer').removeAttr('aria-hidden');  // 20180601 SR-341 : 추가
	});

	//.depth02_wrap a 다음에 ul체크 하여 타이틀 추가 제거
	function nav_depth(){
		$('.nav .depth02_wrap a').each(function(){
			if($(this).next('ul').length > 0){
				$(this).attr('title', '하위메뉴 닫혀있음');
			}
		});
	}nav_depth();

	//nav depth01 펼침/닫힘 타이틀 제어
	$(document).on('click','.nav .depth01 a',function(){
		var idx = $(this).parent().index();
		$(this).attr('title','현재 선택됨 하위메뉴 펼쳐짐').parent().addClass('on').siblings().removeClass('on').children().removeAttr('title');
		$('.depth02').eq(idx).addClass('on').siblings().removeClass('on');
	});

	//.nav .depth02 활성화 및 타이틀 추가
	$(document).on('click','.nav .depth02 a',function(){
		if($(this).next('ul').length > 0){
			if(!$(this).hasClass('on')){
				$(this).attr('title','하위메뉴 펼쳐짐').addClass('on');
				$(this).parent().addClass('on').siblings().removeClass('on');
			}else{
				$(this).attr('title','하위메뉴 닫혀있음').removeClass('on');
				$(this).parent().removeClass('on').siblings().removeClass('on');
			}

			$(this).parent().siblings().not('on').each(function(){
				if($(this).children('a').next('ul').length > 0){
					$(this).children('a').attr('title', '하위메뉴 닫혀있음')
				}
			})

			if($(this).parent().find('a').next('ul').length < 0){
				$(this).removeAttr('title');
			}

		}else{
			$(this).removeAttr('title');
		}

		//depth02 펼침/닫힘 체크 후 타이틀 추가
		$('.nav .depth02 > li.on').siblings('li').each(function(){
			$(this).find('a').each(function(){
				if($(this).next('ul').length > 0 ){
					$(this).attr('title', '하위메뉴 닫혀있음')
				}else{
					$(this).removeAttr('title');
				}
			});
		});

		//depth02 의 마지막 a태그 여백 조절
		$('.depth02 > li > ul > li > a,.depth02 > li > ul > li > ul > li > a').each(function(){
			var ah = $(this).height();
			if(ah > 29){
				$(this).css({
					paddingTop:'10px',
					paddingBottom:'10px'
				});
			}
		});
	});

	// 베너가 1개보다 작거나 같으면 페이징 숨김
	if($('.visual_banner_area > .auto_sl > ul > li').length <= 1){
		$('.visual_banner_area .paging').hide();
	}

	// 베너가 1개 이상일때 실행
	if($('.auto_sl').children('ul').children('li').length > 1){

		//금융몰 슬라이드 왼쪽 스와이프 컨트롤 정의
		$(document).on('swipeleft','.auto_sl',function(){
			if($('.paging a').last().hasClass('on')){
				$(this).find('li.on').animate({left:'-100%'});
				$(this).find('li').first().addClass('on').removeAttr('aria-hidden').animate({left:'100%'},0,function(){
					$(this).animate({left:'0%'});
				}).siblings().removeClass('on').attr('aria-hidden','true');
				$('.paging a').first().addClass('on').siblings().removeClass('on');
			}else{
				$(this).find('li.on').animate({left:'-100%'});
				$(this).find('li.on').next().addClass('on').removeAttr('aria-hidden').animate({left:'100%'},0,function(){
					$(this).animate({left:'0%'});
				}).siblings().removeClass('on').attr('aria-hidden','true');
				$('.paging .on').next().addClass('on').siblings().removeClass('on');
			}
			pagingCheck();
		});

		//금융몰 슬라이드 오른쪽 스와이프 컨트롤 정의
		$(document).on('swiperight','.auto_sl',function(){
			if($('.paging a').first().hasClass('on')){
				$(this).find('li.on').animate({left:'100%'});
				$(this).find('li').last().addClass('on').removeAttr('aria-hidden').animate({left:'-100%'},0,function(){
					$(this).animate({left:'0%'});
				}).siblings().removeClass('on').attr('aria-hidden','true');
				$('.paging a').last().addClass('on').siblings().removeClass('on');
			}else{
				$(this).find('li.on').animate({left:'100%'});
				$(this).find('li.on').prev().addClass('on').removeAttr('aria-hidden').animate({left:'-100%'},0,function(){
					$(this).animate({left:'0%'});
				}).siblings().removeClass('on').attr('aria-hidden','true');
				$('.paging .on').prev().addClass('on').siblings().removeClass('on');
			}
			pagingCheck();
		});

	}else{
		$('.auto_sl .paging').hide();
	}

	//금융몰 슬라이드 영역 좌,우 컨트롤
	$(document).on('click','.auto_sl .btn_act .next',function(){
		$('.auto_sl').swipeleft();
	});
	$(document).on('click','.auto_sl .btn_act .prev',function(){
		$('.auto_sl').swiperight();
	});

	//슬라이드 영역 좌,우 컨트롤
	$(document).on('swipeleft','.detail_sl ul li',function(){
		$('.detail_sl .next').click();
	});
	$(document).on('swiperight','.detail_sl ul li',function(){
		$('.detail_sl .prev').click();
	});

	//바디클릭시 셀렉트가 열려있으면 닫힘 : 접근성추가
	$(document).on('click','body',function(e){
		if(!$('.select_wrap a').is(e.target)){
			$('.select_wrap ul').removeClass('vis_show').addClass('vis_hide').attr('aria-hidden','true').parent().removeClass('selectOpen').addClass('selectClose'); // UI기능개선 2017-10-25
			$('.select_wrap .selectButton').attr('aria-expanded','false'); /* 20108530 SR-302 접근성 select : 추가 */
		};
	});

	//바디 클릭시 안드로이드일때 버튼들 포지션 변경
	$(document).on('click','body',function(input){
		if($(window).width() < 700){
			if($('html').hasClass('mobile')){
				if($('html').hasClass('android')){
					if($('input[type="text"],input[type="email"],input[type="number"],input[type="tel"],input[type="search"],textarea,.input_wrap img').is(input.target) && !input.target.disabled){
						$('html.android .vari_btn,html.android .float_btns, html.android .fb_wrap, html.android .quickfoot, html.android .btnComType').css({
							position:'static',
							marginTop:'10px'
						});
						$('html.android #content .content').css('padding-bottom','90px');
						$('html.android .talk_input_wrap').css({
							'position':'fixed'
						})
					}else{
						$('html.android .vari_btn,html.android .float_btns, html.android .fb_wrap, html.android .quickfoot, html.android .btnComType').css({
							position:'fixed',
							marginTop:'0px'
						});
						if($('html.android #footer').height() < 10){
							$('html.android #content .content').css('padding-bottom','90px');
						}
					}
				}
			}
		}
	});

	//ios에서 인풋요소 외에 영역에 클릭시 푸터 유무를 확인하여 컨텐츠에 여백 추가
	$(document).on('touchstart click','body *',function(ios_input){
		if($(window).width() < 700){
			if($('html').hasClass('ios')){
				if(!$('input[type="text"],input[type="email"],input[type="number"],input[type="tel"],input[type="search"],textarea,.input_wrap img').is(ios_input.target)){
					if($('html.ios #footer').height() < 10){
						$('html.ios #content .content').css('padding-bottom','90px');
					}
				}
			}
		}
	});

	
	// 20180502 SR-341 : 추가
	$(document).on('click', '*[data-role="kb-rnb-menu-nav"] a', function(){
		var that = $(this);
		
		if(that.closest('ul').hasClass('depth-01')){
			return true;
		}else if(that.closest('div').hasClass('depth-02')){
			that.closest('div').parent().siblings().find('*[class^="depth-"]').not('.depth-02').slideUp('fast').find('*[class^="depth-"]').hide().find('a').attr('aria-expanded', false);
			that.closest('div').parent().siblings().find('*[class^="depth-"]').find('li').removeClass('is-active').find('a').attr('aria-expanded', false);
		}

		if(that.parent().hasClass('is-active')){
			that.attr('aria-expanded', false).parent().removeClass('is-active').find('*[class^="depth-"]').slideUp('fast').find('li').removeClass('is-active').find('*[class^="depth-"]').hide().find('a').attr('aria-expanded', false);
		}else{
			that.attr('aria-expanded', true).parent().addClass('is-active').find('*[class^="depth-"]').first().slideDown('fast');
			that.parent().siblings().removeClass('is-active').find('*[class^="depth-"]').slideUp('fast').find('li').removeClass('is-active').find('*[class^="depth-"]').hide();
			that.parent().siblings().find('a').attr('aria-expanded', false);
		}
	});

	// 20180320 SR-275 : Tooltip 수정
    var __isBindInputTooltip = false; 
	var fn_closeTooltip = function(idxBtnTooltip){    
		$('.tooltipArea').each(function(i){
			if(idxBtnTooltip == i){
				return true;
			}
			
			var _tooltipArea = $(this);
			
			if(_tooltipArea.hasClass('on')){
				_tooltipArea.removeClass('on').find('.layerTooltip').slideUp('fast');
			}
		});
	};
	
	$(document).on('click','.tooltipArea .btnTooltip', function(){
		var _btnTooltip = $(this);
		var _idxBtnTooltip = $('.tooltipArea .btnTooltip').index(this);
		fn_closeTooltip(_idxBtnTooltip);


		/* 20170706 SR-420 금융거래목적증빙자료제출 */
		var _tooltipArea = _btnTooltip.closest('.tooltipArea');
		if( _btnTooltip.hasClass('icoType') ) {
			_tooltipArea.addClass('hasClose');
			if ( !_tooltipArea.find('.layerTooltip2').length ) _tooltipArea.find('.layerTooltip').css('top', _btnTooltip.position().top + 26 );
		};
		if(!_tooltipArea.hasClass('on')){
			_tooltipArea.addClass('on').find('.layerTooltip').slideDown('fast');
		};
		/* //20170706 SR-420 금융거래목적증빙자료제출 */
		
		_btnTooltip.closest('dt').next().find('input').data('idx-tooltip', _idxBtnTooltip);
		
		if(!__isBindInputTooltip){
			__isBindInputTooltip = true;
			
			$('input').click(function(){
				fn_closeTooltip($(this).data('idx-tooltip'));
			});
		}
	});
	
	$(document).on('click','.tooltipArea .btnClose', function(){
		$(this).closest('.layerTooltip').slideUp('fast').parent().removeClass('on');
    	return false;
	});
};

//pop_select_list 팝업 ie스크롤 안되는 현상 클래스로 제어
$(function(){
	if($('.pop_select_list').find('li').size() > 2){
		$('.pop_select_list').addClass('slscroll')
	}
})

//3열 리스트 정의
$(function(){
	var $islHeight = [];
	var $info_step_list = $('.info_step_list li');
	var height = 0;
	for(var i = 0; i < $info_step_list.size(); i++){
				$islHeight.push($info_step_list.eq(i).height())
				if($islHeight[i] > height){
						height = $islHeight[i]
				}
	}
	$info_step_list.height(height);
});

//3열 블릿 들어간 리스트 블릿클래스로 추가&제거
$(function(){
	var w_w = $(window).width();
	function resizeStep(){
		$('.info_step_list li').each(function(){
			var that = $(this);
			var cont_offset_left = $('#content .content').offset().left;

			if(w_w > 699){
				if(that.offset().left <= cont_offset_left){
					that.addClass('no_arrw');
				}else{
					that.removeClass('no_arrw');
				}
			}else{
				if(that.offset().left > cont_offset_left){
					that.removeClass('no_arrw');
				}else{
					that.addClass('no_arrw');
				}
			}
		})

	}
	resizeStep();

	$(window).resize(function(){
		resizeStep();
	})
});

//퀵송금 튜토리얼가이드 세로크기 조절
//20181206 
$(function(){
	function quick_guide(){
		$('.quick_guide_sl').each(function(){
			if($('html').hasClass('mobile')){
				var height = $(window).height() - 53;
			}else{
				var height = $(this).closest('.layer_body').height();
			}
			$(this).height(height);
			$(this).find('.detail_sl,ul,li,.sl_con_div').height(height);
		});
	}
	quick_guide();

	$(window).resize(function(){
		quick_guide();
	});
});

//pc, mobile 체크
$(function(){
	var filter = 'win16|win32|win64|mac|macintel';
	if(navigator.platform){
		if(filter.indexOf(navigator.platform.toLowerCase()) < 0){
			$('html').attr('class','mobile');
			$('.kbank_tel_number').attr('href', 'tel:1522-1000');
		}else{
			$('html').attr('class','pc');
			$('.kbank_tel_number').attr('href', '#;');
		}
	}
});

//디바이스 체크
$(function(){
	if($('html').hasClass('mobile')){
		if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
			$('html').addClass('ios');
		}else{
			$('html').addClass('android');
		}
	}
});

//모바일로 접근시 라디오/체크박스 접근성 수정
$(function(){
	if($('html').hasClass('mobile')){
		$('.btn_radio01,.btn_radio,.btn_checkbox').attr('tabindex','0').find('input').siblings('span').attr('tabindex','0')
	}
})

//2열 리스트 홀,짝 구분하여 보더 추가&제거
$(function(){
	function secu_check(){
		var b_width = $(window).width();
		$('.secu_check').each(function(){
			var size = $(this).children('ul').children('li').size(),
				li = $(this).children('ul').children('li');
			if(size > 2){
				if(b_width > 699){
					li.css({
						borderTop:'0',
						borderBottom:'1px solid #e0e0e1'
					});
					if(size % 2 == 0){
						li.last().css('borderBottom','0').prev().css('borderBottom','0');
					}else{
						li.last().css('borderBottom','0');
					}
				}else{
					li.css({
						border:'0',
						borderTop:'1px solid #e0e0e1'
					});
				}
			}else{
				if(b_width > 699){
					li.css({
						borderTop:'0',
						borderBottom:'0'
					});
				}else{
					li.css({
						border:'0',
						borderTop:'1px solid #e0e0e1'
					});
				}
			}
		});
	}
	secu_check();
	$(window).resize(secu_check);
});

//vari_btn을 컨텐츠 최하단으로 이동
$(function(){
	$('#content .content .vari_btn').appendTo('#content .content');
});

$(function(){
	if($('#content').children().attr('id') == 'PBKMAN0000000104V' || $('#content').children().attr('id') == 'PBKMAN0000000101V'){
		$('#footer,.footer').addClass('dark');
	}
});

//3,6,9,12개월 버튼 클릭시 클래스 온오프
$(function(){
	$('.setting_month ul li').click(function(){
		$('.setting_month ul li').removeClass('on')
		$(this).addClass('on')
	})
});

//안드로이드에서만 사용되는 블럭태그 추가 : 접근성
$(function(){
	var bh,
		rebh;
	function heightCheck(){
		if($('html').hasClass('mobile')){
			bh = $(window).height();
			$('<div class="bodycheck" aria-hidden="true" />').prependTo('body');
			$('.bodycheck').css({
				position:'fixed',
				left:'0px',
				top:'0px',
				zIndex:'-99',
				width:'0px',
				height:bh
			});
		}
	}
	heightCheck();

	//안드로이드 팝업 리사이징 될때 크기,여백 조절
	//20181206 
	$(window).resize(function(){
		rebh = $(window).height();
		if(rebh < bh){
			$('html.android .layer_foot').css({
				position:'relative',
				bottom:'-50px'
			});
			$('html.android .alert.layerCom .layer_foot').css({
				position:'relative',
				bottom:'0'
			});
			var hh = $(window).height();
			$('html.android .full .layer_body').css({
				height:hh,
				paddingBottom:'50px'
			});
		}
		if(rebh == bh){
			$('html.android .layer_foot').css({
				position:'static',
				bottom:'0px'
			});
			$('html.android .full .layer_body').css({
				height:'100%',
				paddingBottom:'0px'
			});

			$('html.android .vari_btn,html.android .float_btns').css({
				position:'fixed',
				marginTop:'0px'
			});
			//$('html.android .quickPage .vari_btn.quick, html.android .quickfoot').css({ // 2017-07-28 퀵송금
				//position:'fixed'
			//});
			if($('html.mobile #footer').height() < 10){
				$('html.mobile #content .content').css('padding-bottom','90px');
			}
		}
	});
});

//드롭다운버튼 클릭시 ul show/hide
$(function(){
	$('.in_drop .in_drop_title button').click(function(){
		$(this).parents('dl').next('.in_drop_ul').toggle(0)
		$(this).parents('dl').toggleClass('active')
	})
});

//스탭박스에 타이틀 추가 : 접근성
$(function(){
	$('.step_box .current a').attr('title','현재 진행중');
	$('.step_box .on a').attr('title','완료');
});

//gnb li a가 아닌 다른영역에 마우스접근 및 포커스 시 li에 클래스제거
$(function(){
	$(document).on('mouseenter focus','body',function(e){
		if(!$('html.pc .gnb .inner > ul > li a').is(e.target)){
			$('.gnb .inner > ul > li').removeClass('on');
		}
	});
});

//law li 에 '-' 가 있으면 공백처리
$(function(){
	$('.law li').each(function(){
		var dash = $(this).html().substr(0,1);
		var txt = $(this).html().replace('-','');
		if(dash == '-'){
			$(this).html(txt);
			if(!$(this).parent().hasClass('list_type_dash')){
				$(this).parent().addClass('list_type_dash');
			};
		};
	});
});

//아코디언 더보기버튼 검색하여 무조건 .accordion_info 첫번째 자식으로 이동
$(function(){
	$('.accordion_info .more').each(function(){
		$(this).appendTo($(this).parent());
	});
});

//아코디언 더보기버튼 에 태그삽입후 포커스 연동 : 접근성
$(function(){
	$('.accordion_info .more').each(function(){
		if(!$(this).children().is('i.hdd')){
			$('<i class="hdd">상세내용</i>').prependTo($(this));
		};
	});
});

//팝업 노출시 달력이나 일반팝업일때 상위에 태그삽입하고 포커스 즉시실행
$(function(){
	if($('html').hasClass('ios')){
		if(!$('.calendar_wrap .calendar > *:first').is('.trans')){
			$('<p class="trans" tabindex="0" style="position:absolute; color:transparent; z-index:1">달력입니다.</p>').prependTo('.calendar_wrap .calendar');
		}
		if(!$('.layer_cont > *:first').is('.trans')){
			$('<p class="trans" tabindex="0" style="position:absolute; color:transparent; z-index:1">레이어팝업입니다.</p>').prependTo('.layer_cont');
		};
	};
});

//스위치 온오프
function onoff(){
	$('.switch.onoff').each(function(){
		$(this).find('.base').attr('role','button');
		$(this).find('.on').siblings().attr('aria-hidden','true');
		var span_first = $(this).find('span').first(),
			i_pos = parseInt($(this).find('i').css('left').replace('px',''));
		if(i_pos > 10){
			$(this).find('i').css({background:'#454d5b'}).next('span').css('color','#686e78').siblings('span:last').css('color','#fff');
			$(this).find('.base').attr('aria-pressed','false');
		}else{
			$(this).find('.base').attr('aria-pressed','true');
		};
	});
};

//.vari_btn 이나 float_btn이 있을시 해당버튼들 안드로이드에서 속성 변경
function b_static(){
	if($('.vari_btn').length > 0 || $('.float_btns').length > 0){
		$('html.android .vari_btn,html.android .float_btns').css({
			position:'static',
			marginTop:'10px'
		});
		$('#content .content').css('padding-bottom','0px');
	};
};

//커스텀 체크박스, 라디오버튼 검색하여 감추고 체크시 레이블에 접근성 속성 추가 : 접근성
function input_check(){
	$('input[type="checkbox"],input[type="radio"]').each(function(){
		$(this).attr('tabindex','-1');
		if($(this).is(':checked')){
			$(this).closest('label').attr('aria-checked','true');
		};
	});
};

//페이지 상단 탭영역 클래스 on시 타이틀 속성 추가
function tab_title(){
	$('.tab_type01').each(function(){
		$(this).find('.on').children('a').attr('title','메뉴 선택됨');
	});
};

//팝업 노출시 달력이나 일반팝업일때 상위에 태그삽입하고 포커스 연동 함수정의
function layer_focus(){
	if($('html').hasClass('ios')){
		if(!$('.calendar_wrap .calendar > *:first').is('.trans')){
			$('<p class="trans" tabindex="0" style="position:absolute; color:transparent; z-index:1">달력입니다.</p>').prependTo('.calendar_wrap .calendar');
		};
		if(!$('.layer_cont > *:first').is('.trans')){
			$('<p class="trans" tabindex="0" style="position:absolute; color:transparent; z-index:1">레이어팝업입니다.</p>').prependTo('.layer_cont');
		};
	};
};

//ios 팝업 노출시 포커스 연동 : 접근성
function btn_calendar(){
	$('.calendar_wrap').show(0,function(){
		if($('html').hasClass('ios')){
			$('.calendar_wrap .trans').attr('tabindex','0').focus();
			$('.calendar_wrap #dim').show();
		}else{
			$('.calendar_wrap .calendar').attr('tabindex','0').focus();
			$('.calendar_wrap #dim').show();
		};
	});
	if(layer_btn != null)	layer_btn = $(this);
};

//ios 팝업 노출시 포커스 연동 : 접근성
function ios_layer_focus(){
	layer_focus();
	if($('html').hasClass('ios')){
		$('.layer_cont').removeAttr('tabindex').find('.trans').focus();
	};
};



//모바일 웹
$(function(){
	//배너 슬라이드
	function banner(){
		$('.m_web .banner').each(function(){
			var winW = $(window).width();
			var slide = $(this).find('.slide');
			var paging = $(this).find('.paging');
			var a = paging.find('a');
			var ul = slide.find('ul');
			var li = slide.find('li');
			var img = li.find('img');
			var num = li.length;
			var time = 300;

			li.width(winW);
			li.children('a').first().width(winW);
			li.last().width(winW+81);
			li.last().children('a').first().width(winW);
			ul.width((winW*num)+81);
			li.find('.more').height(li.height()).children('span').css('padding-top',(li.height()-43)/2);

			var first = ul.find('li:first-child');
			var idx2 = ul.find('.on').index();

			// 페이징 뷰체크
			if(num == 1){
				paging.hide();
			};
		});
	}banner();
	$(window).resize(function(){
		banner();
	});

	if($('.m_web .banner ul').length>0){
		//모바일 에서 왼쪽으로 스와이프 할때
		$('.m_web .banner ul').swipeleft(function(){
			var li = $(this).find('li').length;
			var ul = $(this);
			var paging = $(this).parents('.m_web .banner').find('.paging');
			var idx = $(this).find('li.on').index();
			if(li>1){
				var bw = $(window).width(),
					uw = $(this).width(),
					lm = parseInt($(this).css('margin-left').replace('px',''));
				if(!$(this).children().last().hasClass('on')){
					$(this).stop(true,true).animate({marginLeft:-((idx+1)*bw)});
					ul.find('li.on').next().addClass('on').siblings().removeClass('on');
					paging.find('a.on').next().addClass('on').siblings().removeClass('on');
				}else{
					if(!$(this).children().last().hasClass('b_more')){
						$(this).stop(true,true).animate({marginLeft:-(uw-(bw*(li-1)))}).children().last().addClass('b_more');
					};
				};
			};
		});

		//모바일 에서 오른쪽으로 스와이프 할때
		$('.m_web .banner ul').swiperight(function(){
			var li = $(this).find('li').length;
			var ul = $(this);
			var paging = $(this).parents('.m_web .banner').find('.paging');
			var idx = $(this).find('li.on').index();
			if(li>1){
				var bw = $(window).width(),
					uw = $(this).width(),
					lm = parseInt($(this).css('margin-left').replace('px',''));
				if(!$(this).children().first().hasClass('on')){
					if($(this).children().last().hasClass('b_more')){
						$(this).stop(true,true).animate({marginLeft:-(uw-(bw*(li-1))-81)},function(){
							$(this).children().last().removeClass('b_more');
						});
					}else{
						$(this).stop(true,true).animate({marginLeft:-((idx-1)*bw)});
						ul.find('li.on').prev().addClass('on').siblings().removeClass('on');
						paging.find('a.on').prev().addClass('on').siblings().removeClass('on');
					};
				};
			};
		});
	};

	// gnb
	var m_menu = $('.m_web #header .menu');
	var link = $('.m_web a');
	var m_gnb = $('.m_web #header .gnb');
	link.on('click',function(){
		var tt = $(this);
		var menu = tt.parents('.m_web').find('#header .menu');
		if(!tt.hasClass('menu') && menu.hasClass('on')){
			m_gnb.slideUp();
			m_menu.find('.hdd').html('주요메뉴 보기');
			m_menu.removeClass('on');
		};
	});
	$('.m_web #header .menu').on('click',function(){
		var menu = $(this);
		var gnb = $('.m_web #header .gnb');
		menu.toggleClass('on');
		if(menu.hasClass('on')){
			gnb.slideDown();
			menu.find('.hdd').html('주요메뉴 닫기');
		}else{
			gnb.slideUp();
			menu.find('.hdd').html('주요메뉴 보기');
		};
	});

	// 퀵송금 안내
	$('.m_web .product_info_wrap a.more').on('click',function(){
		var title = $(this).parent('.title');
		var detail = title.next('.detail');
		console.log(detail);
		title.toggleClass('on');
		if(title.hasClass('on')){
			detail.show();
			$(this).text('닫기');
		}else{
			detail.hide();
			$(this).text('펼쳐보기');
		};
	});
});

/*
	공과금 ui
*/
$(function(){
	// radio + 기능
	$('.fn_radio .btn_radio').on('click', function(){
		var radioIdx = $(this).index() + 1;
		$('.fn_radio_con').hide();
		$('.fn_radio_con'+ radioIdx).show();
	});
	//checkbox
	$('.fn_checkbox input').on('click', function(){
		var chk = $('.fn_checkbox input').is(':checked');
		if (chk == true) {
			$('.fn_check_con').removeClass('none');
		} else {
			$('.fn_check_con').addClass('none');
		}
	});
});


var loadingBoxLayer = function() { // Loading
	//css로 상태유지 (개발호출로 인해 제거불가)
};

$(document).ready(function () {
	loadingBoxLayer(); // Loading

	$(".tabSection .lineTab > li").click(function(e){  // Tab (은행소개)
		$(".tabSection .cont").css("display","none");
		$(".tabSection .cont").eq($(this).index()).css("display","block"); 
		$(".tabSection .lineTab > li").removeClass("on");
		$(this).addClass("on");
		e.preventDefault();
	});

	$(".linkTab > li").click(function(){  // Tab (은행소개, APP GNB)
		$(this).parent().children("li").removeClass("on");
		$(this).addClass("on");
	});
});

/* 2018-01-23 추가 : 상단 탭 메뉴 스크롤 시 위치 고정 */
var scrollFixedMenu = [];
var scrollFixedTopMarginVal = 0;
function scrollFixedMenuStart(){
	$(window).scroll(function(){
		if($(window).width() <= 699){
			var st = $(this).scrollTop();
			var wh = $(window).height();
			var tg;		// tringger target
			var tMg = 0;	// trigger top margin

			// 동적 생성 시 대응
			var targetReloadTarget = $(".comCont .listTab");
			//var targetReloadTarget = $(".comCont .listTab");
			
			if(targetReloadTarget.length>0){
				if(!targetReloadTarget.data("orgTopPos")){
					addScrollFixedMenuObj();
				}
			}

			if(scrollFixedMenu.length ){
				for(var i=0; i<scrollFixedMenu.length; i++){
					tg = scrollFixedMenu[i];
					if(tg.length>0){
						if(tg.data("marginObj")!="none"){
							tMg = scrollFixedTopMarginVal = $(tg.data("marginObj")).height();
						} else {
							tMg = scrollFixedTopMarginVal = 0;
						}

						if(tMg < (tg.data("orgTopPos")-1)){
							// 탭 버튼 초기 위치가 헤더 바로 아래가 아닐 경우
							if(st > (tg.data("orgTopPos")-Number(tMg))){
								if(!tg.hasClass("topPosFixed")){
									tg.trigger("FIXED-START");
								}
							} else {
								if(tg.hasClass("topPosFixed")){
									tg.trigger("FIXED-STOP");
								}
							}
						}
					}
				}
			}
		}
	});
}

function addScrollFixedMenuObj(){
	var targetClass, targetHeaderClass, targetObj;
	if($(window).width() <= 699){
		targetClass = '.comCont .listTab, [data-role="scrollFixedMenu"]'; // 20181204 SR-575 : [data-role="scrollFixedMenu"] 추가
		targetHeaderClass = "#header";
		//targetClass = ".comCont .listTab";
		//targetHeaderClass = ".header.reformHeader";
		targetObj = $(targetClass);

		if(targetObj.length > 0){
			if($(targetHeaderClass).length>0){
				targetObj.data("marginObj",targetHeaderClass);	// trigger top margin 설정
				scrollFixedTopMarginVal = $(targetHeaderClass).height();
			} else {
				targetObj.data("marginObj","none");
				scrollFixedTopMarginVal = 0;
			}
			targetObj.data("orgTopPos",targetObj.offset().top);	// trigger top margin 설정
			targetObj.off("FIXED-START");
			targetObj.on("FIXED-START",function(){
				if(!$(this).hasClass("topPosFixed")){
					$(this).addClass("topPosFixed");
					$(this).css("top",scrollFixedTopMarginVal+"px");
				}
			});
			targetObj.off("FIXED-STOP");
			targetObj.on("FIXED-STOP",function(){
				if($(this).hasClass("topPosFixed")){
					$(this).removeClass("topPosFixed");
					$(this).css("top","auto");
				}
			});
			scrollFixedMenu.push(targetObj);

			var fixedWrap = targetObj.closest(".fixedMenuWrap");
			if(fixedWrap.length>0){
				fixedWrap.css("height",targetObj.outerHeight());  // 20181204 SR-575 : outerHeight 로 수정
			}

			// 해더 바로 밑에 fixed 탭이 위치하는 경우 : fixed
			if($(targetHeaderClass).height() >= (targetObj.data("orgTopPos")-1)){
				if(!$(".banner_wrap").length){
					targetObj.trigger("FIXED-START");
				}
			}
		}
	}
}

//content_bg_white class가 있을 시, contents높이 조절
function bgWhiteHeight(){

	var _contents = $('.content'),
		_windowHeight = $(window).height() - 130;

	if( _contents.hasClass('content_bg_white') ){

		_contents.css('height', _windowHeight);

	}

}

$(document).ready(function(){
	addScrollFixedMenuObj();
	scrollFixedMenuStart();
	bgWhiteHeight();
});

$(window).on("resize",function(){
	if($(window).width() > 699){
		$(".comCont .listTab").removeClass("topPosFixed").css("top","auto");
		$(".comCont .fixedMenuWrap").css("height","auto");
	}


});

function layerWrapHeightResize(){
	
	var _scrollUnbind = $('#wrap, .pageBlockDiv'),
		_talkwrap = $('.talkContainer');

	_scrollUnbind.height($(window).height()).css('position', 'fixed');

	
}


// 20181022 SR-559 추가
function f_initBigBannerSlider(){
	$.get('/resource/js/cmm/lightslider.js', function(){
		var target = $(".big_banner_slider");
		var bannerSlider = null;
		
		if(target.data('big-banner')){
			target.data('big-banner').destroy();
		}
		
		bannerSlider = target.lightSlider({
			slideMargin:0,
			mode:'fade',
			pause:6000,
			speed:500,
	    	controls: true,
			loop:true,
			onSliderLoad: function(){
				var btnHtml ='<a href="#none" class="btn_control stop" data-role="btn-pager-control"><span>정지</span></a>';
				$(".topSwipeBanner .banner_wrap, .visual_banner_area .banner_wrap").append(btnHtml);
				$('a[data-role="btn-pager-control"]').click(function(){
					var that = $(this);
					
					if(that.hasClass('play')){
						bannerSlider.play();
						that.removeClass('play').addClass('stop').find('span').text('정지');
					}else{
						bannerSlider.pause();
						that.removeClass('stop').addClass('play').find('span').text('재생');
					}
				});
			}
	    });
		
		target.data('big-banner', bannerSlider);
	});
}

/* //2018-01-23 추가 : 상단 탭 메뉴 스크롤 시 위치 고정 */

/**
 *	두가지 날짜 선택
 *	
 *	wrapper : data-role="ui-double-date-picker-wrap"
 *	호출버튼 : data-role="ui-double-date-picker"
 *	타이틀 첫번째 값 명칭 : data-role="ui-double-date-val1" > data-text
 * 	타이틀 두번째 값 명칭 : data-role="ui-double-date-val2" > data-text
 *  달력 첫번째 값 명칭 : #datePicker1 > data-text
 *  달력 두번째 값 명칭 : #datePicker2 > data-text
 *  달력 첫번째 값 : #datePicker1 > data-arry
 *  달력 두번째 값 : #datePicker2 > data-arry
 *  
 */
function f_initDoubleDatePicker(){
    var _calDateSelect = $('*[data-role="ui-double-date-picker-wrap"]');
    
    if(_calDateSelect.length === 0) return false;
    
    _calDateSelect.on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
    });
    
    $('*[data-role="ui-double-date-picker"]').click(function(){
        f_popDoubleDatePicker(true);
    });
    
    _calDateSelect.find('.calendar_dateSelect_close').click(function(){
        f_popDoubleDatePicker(false);
    });
    
    _calDateSelect.find('.calendar_dateSelect_confirm').click(function(){
        var _doubleDate = f_getDoubleDate();
        var _date1Text = _calDateSelect.find('*[data-role="ui-double-date-val1"]').data('text');
        var _date2Text = _calDateSelect.find('*[data-role="ui-double-date-val2"]').data('text');
        
        $('*[data-role="ui-double-date-picker"]')
        	.data({"date1": _doubleDate.date1, "date2":_doubleDate.date2})
        	.val(_doubleDate.date1 + _date1Text +_doubleDate.date2 + _date2Text);
        
        f_popDoubleDatePicker(false);
    });

	var f_popDoubleDatePicker = function(onOff){
	    var _calDateSelect = $('div.calendar_dateSelectTerm');
	    var _doubleDatePicker = $('*[data-role="ui-double-date-picker"]');
	    var _datePicker1 = _doubleDatePicker.data('date1');
	    var _datePicker2 = _doubleDatePicker.data('date2');

	    if(onOff){
	        _calDateSelect.show();
	        f_initDoubleDateScroll(_datePicker1, _datePicker2);
	    }else{
	        var _datePicker = $('#datePicker1, #datePicker2');
	        
	        _dp1Scroll.destroy();
	        _dp2Scroll.destroy();
	        
	        _datePicker.off('mousewheel').find('a').off('click');
	        
	        _calDateSelect.hide();
	    }
	};

	var f_initDoubleDateScroll = function(p_date1, p_date2){
	    var _datePicker1 = $('#datePicker1');
	    var _datePicker2 = $('#datePicker2');
	    var _date1Text = _datePicker1.data('text');
	    var _date2Text = _datePicker2.data('text');
	    var _date1Arry = _datePicker1.data('arry').split(',');
	    var _date2Arry = _datePicker2.data('arry').split(',');
	    var _date1Html = '';
	    var _date2Html = '';

	    $.each(_date1Arry, function(i, v){
	    	var _activeClass = '';
	        if((p_date1 && Number(v) === Number(p_date1)) || (!p_date1 && Number(v) === 1)) _activeClass = ' class="active"';
	        
	        _date1Html += '<li' + _activeClass + '><a href="javascript:void(0);" data-date1="' + v + '">' + v + _date1Text +'</a></li>';
	    });
	    
	    _datePicker1.find('ul').empty().append(_date1Html);
	    
	    $.each(_date2Arry, function(i, v){
	    	var _activeClass = '';
	        if((p_date2 && Number(v) === Number(p_date2)) || (!p_date2 && Number(v) === 1)) _activeClass = ' class="active"';
	        
	        _date2Html += '<li' + _activeClass + '><a href="javascript:void(0);" data-date2="' + v + '">' + v + _date2Text + '</a></li>';
	    });
	    
	    _datePicker2.find('ul').empty().append(_date2Html);
	    
	    _dp1Scroll = new iScroll('datePicker1',{
	        hScrollbar: false,
	        vScrollbar: false,
	        wheelAction: 'none',
	        onScrollEnd : function(){
	            f_scrollDatePicker(_datePicker1, _dp1Scroll);
	        }
	    });
	    
	    _dp2Scroll = new iScroll('datePicker2',{
	        hScrollbar: false,
	        vScrollbar: false,
	        wheelAction: 'none',
	        onScrollEnd : function(){
	            f_scrollDatePicker(_datePicker2, _dp2Scroll);
	        }
	    });
	    
	    var _oHeight = _datePicker1.find('ul').find('li').first().outerHeight();
	    var _d1Top = (_datePicker1.find('li.active').index()) * _oHeight;
	    var _d2Top = (_datePicker2.find('li.active').index()) * _oHeight;
	    
	    _dp1Scroll.scrollTo(0, -_d1Top, 0);
	    _dp2Scroll.scrollTo(0, -_d2Top, 0);
	    
	    var setScrollAndClickEvent = function(_picker, _scroll){
	        _picker.on('mousewheel', function(e){
	            var _nowTop = _picker.find('li.active').index() * _oHeight;
	            
	            if(e.originalEvent.wheelDelta === 120){
	                _scroll.scrollTo(0, -(_nowTop - _oHeight), 0);
	            }else{
	                _scroll.scrollTo(0, -(_nowTop + _oHeight), 0);
	            };
	            
	            e.preventDefault();
	        }).on('click', 'a', function(e){
	            var _top = _picker.find('a').index(this) * _oHeight;
	            
	            _scroll.scrollTo(0, -_top, 0);
	            
	            e.preventDefault();
	        });
	    };
	    
	    setScrollAndClickEvent(_datePicker1, _dp1Scroll);
	    setScrollAndClickEvent(_datePicker2, _dp2Scroll);
	};

	var f_getDoubleDate = function(){
	    var _d1 = $('#datePicker1').find('li.active > a').data('date1');
	    var _d2 = $('#datePicker2').find('li.active > a').data('date2');
	                                                                
	    var doubleDate = {"date1" : _d1, "date2" : _d2};
	    
	    return doubleDate;
	};

	var f_setDoubleDate = function(){
	    var _doubleDate = f_getDoubleDate();
	   	
	   	$('*[data-role="ui-double-date-val1"]').text(_doubleDate.date1);
	   	$('*[data-role="ui-double-date-val2"]').text(_doubleDate.date2);
	};

	var f_scrollDatePicker = function(_wrapper, _scroll){
	    var _top = 0;
	    var _oHeight = _wrapper.find('ul').find('li').first().outerHeight();
	    var _startTop = _wrapper.offset().top + parseInt(_wrapper.find('ul').css('padding-top'), 10) - _oHeight / 2;
	    var _endTop = _startTop + _oHeight;
	    
	    _wrapper.find('ul').find('li').each(function(){
	        var _that = $(this);
	        
	        if(_that.offset().top > _startTop && _that.offset().top <= _endTop){
	            _that.addClass('active').siblings().removeClass('active');
	            f_setDoubleDate();
	            
	            if(_scroll.y !== -_top) _scroll.scrollTo(0, -_top, 200);

	            return false;
	        }
	        
	        _top += _oHeight;
	    });
	};
}

/**
*	토스트 메세지 호출
*
*	@param {string}	message	메세지 내용
*	@param {Object}	target	토스트 팝업 적용될 부모창 (jQuery Object)
*	@param {number}	delay	메세지 표시 시간 (ms)
*	@param {function}	callback	callback 함수
*/
function callToastMessage(message, target, delay, callback){
	var _delay = delay ? delay : 2000;
	var _html = '';
	
	_html += '<div class="toast-message">';
	_html += '	<p>' + message + '</p>';
	_html += '</div>';
	
	target.append(_html);
	
	setTimeout(function(){
		target.find('.toast-message').addClass('active');
	});
	
	setTimeout(function(){
		target.find('.toast-message').animate({
			'opacity': '-10'
		},{
			// step: function(){
			// 	$(this).css('transform', 'translate3d(0,38px,0)');
			// },
			duration: 800,
			complete: function(){
				$(this).remove();
				callback();
			}
		});
	}, _delay);
}