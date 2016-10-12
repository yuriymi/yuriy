



jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav');

	//открыть модальное окно
	$main_nav.on('click', function(event){

		if( $(event.target).is($main_nav) ) {
			// открыть на мобильных подменю
			$(this).children('ul').toggleClass('is-visible');
		} else {
			// закрыть подменю на мобильных
			$main_nav.children('ul').removeClass('is-visible');
			//показать модальный слой
			$form_modal.addClass('is-visible');	
			//показать выбранную форму
			( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
		}

	});

	//закрыть модальное окно
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//закрыть модальное окно нажатье клавиши Esc 
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//переключения  вкладки от одной к другой
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//скрыть или показать пароль
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');
		
		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Скрыть' == $this.text() ) ? $this.text('Показать') : $this.text('Скрыть');
		//фокус и перемещение курсора в конец поля ввода
		$password_field.putCursorAtEnd();
	});

	//показать форму востановления пароля 
	$forgot_password_link.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	//Вернуться на страницу входа с формы востановления пароля
	$back_to_login_link.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

	//при желании можно отключить - это просто, сообщения об ошибках при заполнении
	$form_login.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	$form_signup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	//запасной placeholder для IE9
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};





/* Start Kalendar*/
 
if (!fcp)
	var fcp = new Object();
if (!fcp.msg)
	fcp.msg = new Object();
if (!fcp)
	var fcp = new Object();
if (!fcp.msg)
	fcp.msg = new Object();
fcp.week_days = ["Пн", "Вт", "Ср", "Чт", "Пн", "Сб", "Вс"];
fcp.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
	"Июль", "Август", "сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
fcp.msg.prev_year = "предыдущий год";
fcp.msg.prev_month = "предыдущий месяц";
fcp.msg.next_month = "следующий месяц";
fcp.msg.next_year = "следующий год";
fcp.Calendar = function(element, show_clock) {
if (!element.childNodes)
throw "HTML element expected";
this.element = element;
this.selection = new Date();
this.show_clock = show_clock;
this.selected_cell = undefined;
this.generate_month();
this.render_calendar();
}
fcp.Calendar.prototype.set_date_time = function (date_time) {
	if (date_time.constructor == Date) {
		this.selection = date_time;
		this.generate_month();
		this.render_calendar();
	} else {
		throw "Date object expected (in fcp.Calendar.set_date_time)";
	}
}
fcp.Calendar.prototype.next_month = function () {
	var month = this.selection.getMonth();
	if (month == 11) {
		this.selection.setMonth(0);
		this.selection.setYear(this.selection.getFullYear() + 1);
	} else {
		this.selection.setMonth(month + 1);
	}
	this.generate_month();
	this.render_calendar();
}
fcp.Calendar.prototype.prev_month = function () {
	var month = this.selection.getMonth();
	if (month == 0) {
		this.selection.setMonth(11);
		this.selection.setYear(this.selection.getFullYear() - 1);
	} else {
		this.selection.setMonth(month - 1);
	}
	this.generate_month();
	this.render_calendar();
}
fcp.Calendar.prototype.next_year = function () {
	var is_feb29 = (this.selection.getMonth() == 1)
		&& (this.selection.getDate() == 29);
	if (is_feb29) {
		this.selection.setDate(1);
		this.selection.setMonth(2); // March
	}
	this.selection.setFullYear(this.selection.getFullYear() + 1);
	this.generate_month();
	this.render_calendar();
}
fcp.Calendar.prototype.prev_year = function () {
	var is_feb29 = (this.selection.getMonth() == 1)
		&& (this.selection.getDate() == 29);
	if (is_feb29) {
		this.selection.setDate(1);
		this.selection.setMonth(2); // March
	}
	this.selection.setFullYear(this.selection.getFullYear() - 1);
	this.generate_month();
	this.render_calendar();
}
fcp.Calendar.prototype.generate_month = function () {
	this.raw_data = new Array();
	var week = 0;
	this.raw_data[week] = new Array(7);
	var first_of_month = fcp.Calendar.clone_date(this.selection);
	first_of_month.setDate(1);
	var first_weekday = first_of_month.getDay();
	first_weekday = (first_weekday == 0) ? 6 : first_weekday - 1;
	for (var i = 0; i < first_weekday; i++) {
		this.raw_data[week][i] = 0;
	}
	var last_of_month = fcp.Calendar.days_in_month(
		this.selection.getYear(),
		this.selection.getMonth());
	var weekday = first_weekday;
	for (var i = 1; i <= last_of_month; i++) {
		this.raw_data[week][weekday] = i;
		weekday++;
		if (weekday > 6) {
			weekday = 0;
			week++;
			this.raw_data[week] = new Array(7);
		}
	}
	for (var i = weekday; i < 7; i++) {
		this.raw_data[week][i] = 0;
	}
}
fcp.Calendar.prototype.render_calendar = function () {
	this.element.selected_cell = undefined;
	this.element.innerHTML = "";
	this.element.appendChild(this.render_month());
}
fcp.Calendar.prototype.render_heading = function () {
	var heading = document.createElement("caption");
	var prev_year = document.createElement("a");
	prev_year.href = "#";
	prev_year.calendar = this;
	prev_year.onclick = function() {
		this.calendar.prev_year();
		return false;
	};
	prev_year.innerHTML = "<<";
	prev_year.title = fcp.msg.prev_year;
	var prev_month = document.createElement("a");
	prev_month.href = "#";
	prev_month.calendar = this;
	prev_month.onclick = function() {
		this.calendar.prev_month();
		return false;
	};
	prev_month.innerHTML = "<";
	prev_month.title = fcp.msg.prev_month;
	var month_year = document.createTextNode(
		"\u00a0" + fcp.months[this.selection.getMonth()]
		+ " " + this.selection.getFullYear() + "\u00a0");
	var next_month = document.createElement("a");
	next_month.href = "#";
	next_month.calendar = this;
	next_month.onclick = function() {
		this.calendar.next_month();
		return false;
	};
	next_month.innerHTML = ">";
	next_month.title = fcp.msg.next_month;
	var next_year = document.createElement("a");
	next_year.href = "#";
	next_year.calendar = this;
	next_year.onclick = function() {
		this.calendar.next_year();
		return false;
	};
	next_year.innerHTML = ">>";
	next_year.title = fcp.msg.next_year;
	heading.appendChild(prev_year);
	heading.appendChild(document.createTextNode("\u00a0"));
	heading.appendChild(prev_month);
	heading.appendChild(month_year);
	heading.appendChild(next_month);
	heading.appendChild(document.createTextNode("\u00a0"));
	heading.appendChild(next_year);
	return heading;
}
fcp.Calendar.prototype.render_month = function() {
	var html_month = document.createElement("table");
	html_month.className = "calendar";
	html_month.appendChild(this.render_heading());
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	for (var i = 0; i < fcp.week_days.length; i++) {
		var th = document.createElement("th");
		th.innerHTML =  fcp.week_days[i];
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	html_month.appendChild(thead);
	var tbody = document.createElement("tbody");
	for (var i = 0; i < this.raw_data.length; i++) {
		tbody.appendChild(this.render_week(this.raw_data[i]));
	}
	html_month.appendChild(tbody);
	return html_month;
}
fcp.Calendar.prototype.render_week = function (day_numbers) {
	var html_week = document.createElement("tr");
	html_week.align = "right";
	for (var i = 0; i < 7; i++) {
		html_week.appendChild(this.render_day(day_numbers[i]));
	}
	return html_week;
}
fcp.Calendar.prototype.render_day = function (day_number) {
	var td = document.createElement("td");
	if (day_number >= 1 && day_number <= 31) {
		var anchor = document.createElement("a");
		anchor.href = "#";
		anchor.innerHTML = day_number;
		anchor.calendar = this;
		anchor.date = day_number;
		anchor.onclick = fcp.Calendar.handle_select;
		td.appendChild(anchor);
		if (day_number == this.selection.getDate()) {
			this.selected_cell = td;
			td.className = "in_month selected";
		} else {
			td.className = "in_month";
		}
	}
	return td;
}
fcp.Calendar.prototype.onselect = function () {}
fcp.Calendar.clone_date = function (date_obj) {
	if (date_obj.constructor != Date)
		throw "Date object expected (in fcp.Calendar.clone_date)";
	else
		return new Date(
			date_obj.getFullYear(),
			date_obj.getMonth(),
			date_obj.getDate(),
			date_obj.getHours(),
			date_obj.getMinutes(),
			date_obj.getSeconds());
}
fcp.Calendar.days_in_month = function (year, month) {
	if (month < 0 || month > 11)
		throw "Month must be between 0 and 11";
	var day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month != 1) {
		return day_count[month];
	} else if ((year % 4) != 0) {
		return 28;
	} else if ((year % 400) == 0) {
		return 29;
	} else if ((year % 100) == 0) {
		return 28;
	} else {
		return 29;
	}
}
fcp.Calendar.handle_select = function () {
	if (this.calendar.selected_cell)
	this.calendar.selected_cell.className = "in_month";
	this.calendar.selected_cell = this.parentNode;
	this.parentNode.className = "in_month selected";
	this.calendar.selection.setDate(this.date);
	this.calendar.onselect(this.calendar.selection);
	return false;
}
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(function() {
  cal = new fcp.Calendar(document.getElementById("cal_placeholder"));
  cal.onselect = function(date) {alert(date);}; } )
 
 /* End Kalendar */
 
 /* Start Slider */
 
    var width = 66; 
    var count = 3; 

    var carousel = document.getElementById('carousel');
    var list = carousel.querySelector('ul');
    var listElems = carousel.querySelectorAll('li');

    var position = 0;

    carousel.querySelector('.prev').onclick = function() {
      
      position = Math.min(position + width * count, 0)
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
     
      position = Math.max(position - width * count, -width * (listElems.length - count));
      list.style.marginLeft = position + 'px';
    };
	
	
	/* End Slider */
 
	
	