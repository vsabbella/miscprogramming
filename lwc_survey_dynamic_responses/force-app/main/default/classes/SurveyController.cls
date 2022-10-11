public with sharing class SurveyController {
    public SurveyController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestionList(String ServeyId) {
        System.debug(LoggingLevel.Error,'SurveyId'+ServeyId);
        return [
            SELECT Id, Name,Question_Text__c,ResponseType__c, (Select Id,Name,Score__c,Selected__c from Responses__r) FROM Question__c
             Where Id In (Select Question__c from Survey_Question__c where Survey__c = :ServeyId )  
        ];
    }

    @AuraEnabled(Cacheable=false)
    public static void updateSelectedAnswers(String[] answers) {
        
        set<Responses__c> responses= new set<Responses__c>();
        for(Responses__c res: [Select Id,Name,Selected__c from Responses__c where id in :answers]){
            res.Selected__c = true;
            responses.add(res);
        }
        List<Responses__c> reslist = new List<Responses__c>(responses);
        update reslist;
        
    }
}