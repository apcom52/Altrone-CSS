import React, {Component} from 'react';

class CardTitle extends Component {
	render() {
		return (
			<h4 className="yellow-fg margin-left-1 margin-vertical-05">{this.props.children}</h4>
		);
	}
}

class Card extends Component {
	render() {
		switch (this.props.type) {
			case 'timetable':
				const timetable = this.props.timetable;
				return (
					<div className="card card--no-smooth margin-horizontal-0">
						<CardTitle>{this.props.title}</CardTitle>
						<TimetableLessonsList timetable={timetable}/>
					</div>
				);
			case 'event':
				return (
					<div className="card card--no-smooth margin-horizontal-0">
						<CardTitle>{this.props.title}</CardTitle>
						<CardEvent title={this.props.eventTitle} datetime={this.props.datetime} is_required={this.props.is_required}/>
					</div>
				);
		}
	}
}

class TimetableLesson extends Component {
	render() {
		var earlier = '', control = '', homework = '';
		if (this.props.earlier) earlier = <p className="bold blue-fg">начнется раньше</p>;
		if (this.props.control) control = <p className="bold red-fg">контрольная работа</p>;
		if (this.props.homework) homework = <p><span className="black-fg bold">домашнее задание</span>: {this.props.homework}</p>;

		return (
			<div className="row padding-1 timetable__lesson">
				<div className="timetable__lesson__title">{this.props.title}</div>
				<div className="timetable__lesson__meta">{this.props.type} {this.props.time}. Аудитория {this.props.place}
					{earlier} {control} {homework}
				</div>			
				
			</div>
		)
	}
}

class TimetableLessonsList extends Component {
	render() {
		const content = this.props.timetable.map((lesson) =>
			<TimetableLesson 	title={lesson.title} 
								time={lesson.time} 
								type={lesson.type} 
								place={lesson.place} 
								key={lesson.id} 
								earlier={lesson.earlier}
								control={lesson.control}
								homework={lesson.homework}
								/>
		);

		return (
			<div className="vertical-layout vertical-layout--stripped timetable">
				{content}
			</div>
		);
	}
}

class CardEvent extends Component {
	render() {
		var is_required = "";
		if (this.props.is_required == 'true') {
			is_required = <h6 className="margin-0 margin-vertical-05 red-fg bold">Обязательно для посещения</h6>
		}
		return (
			<div className="u-gray-bg padding-1">
				<h4 className="margin-0">{this.props.title}</h4>
				<h2 className="helvetica-ultra margin-0">{this.props.datetime}</h2>
				{is_required}
			</div>
		);
	}
}

class DemoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timetable: null
		}
	}

	render() {
		var myarray = [
				{
	                "place": "4-508",
	                "time": "в 8:20",
	                "type": "Практика",
	                "title": "Английский язык",
	                "earlier": true,
	                "control": true,
	            },
	            {
	                "place": "1-422",
	                "time": "в 10:00",
	                "type": "Практика",
	                "title": "Математические методы анализа данных"
	            },
	            {
	                "place": "1-413",
	                "time": "в 11:45",
	                "type": "Практика",
	                "title": "Английский язык",
	                "control": true,
	                "homework": "написать рассказ"
	            },
	            {
	                "place": "1-515",
	                "time": "в 14:00",
	                "type": "Лабораторная",
	                "title": "Экология"
	            }
	        ];

		return (
			<div>
				<Card type="event" title="мероприятие" eventTitle="Контрольная у Синцова" datetime="в 11:45 через 2 дня"/>
				<Card type="event" title="мероприятие" eventTitle="Контрольная у Синцова" datetime="в 11:45 через 2 дня" is_required="true" />
				<Card type="timetable" title="сегодня" timetable={myarray}/>
			</div>
		);
	}
}

ReactDOM.render(
	<DemoApp></DemoApp>,
	document.getElementById('app')
)