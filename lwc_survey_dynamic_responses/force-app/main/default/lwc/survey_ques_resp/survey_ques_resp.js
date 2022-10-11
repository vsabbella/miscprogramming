import { LightningElement, api, wire } from 'lwc';
import getQuestionList from '@salesforce/apex/SurveyController.getQuestionList';
import updateSelectedAnswers from '@salesforce/apex/SurveyController.updateSelectedAnswers';
import { getRecord } from 'lightning/uiRecordApi';

const SURVEY_FIELDS = [
  'Survey__c.Name'
];

export default class Survey_ques_resp extends LightningElement {
  @api _recordId;
  questions;
  record;
  error;
  selected = [];

  @api
  get recordId() {
    return this._recordId;
  }
  set recordId(value) {
    this._recordId = value;

    if (this._recordId) {
      console.log('recordId', this._recordId);
      this.callgetQuestions(this._recordId);
    }
  }





  callgetQuestions() {

    getQuestionList({ ServeyId: this._recordId })
      .then(result => {
        console.log('result1', result);
        //copy the data
        let data = JSON.parse(JSON.stringify(result))

        data.forEach(function (item) {
          item['checkbox'] = item['ResponseType__c'] === "checkbox" ? true : false;
          item['radiobutton'] = item['ResponseType__c'] === "radiobutton" ? true : false;
          item['value'] = [];
          item['responses__t'] = [];
          item.Responses__r.forEach(function (resp) {
            item.responses__t.push({ "label": resp.Name, "value": resp.Id });
          });
        });
        console.log('reslut after2', data);
        this.questions = data;
      })
      .catch(error => {
        console.log('error', error)
        this.error = error;
      });
  }

  handleChange(event) {
    console.log('event' + event.detail.value);
    if (typeof event.detail.value === 'string') {
      this.selected.push(event.detail.value);
    }
    else {
      debugger;
      console.log('typeof', typeof event.detail.value)

      for (let i = 0; i < event.detail.value.length; i++) {
        this.selected.push(event.detail.value[i]);
      }
    }

    console.log('selected', this.selected);
  }

  handleClick() {
    console.log('Selected Responses.', this.selected);
    updateSelectedAnswers({ answers: this.selected })
      .then(result => {
        console.log('saved');
        //display toast message.
      })
      .catch(error => {
        console.log('error', error)
        this.error = error;
      });

  }





}