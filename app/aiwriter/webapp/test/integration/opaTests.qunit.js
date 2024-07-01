sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fullstackcapfiori/AIWriter/test/integration/FirstJourney',
		'fullstackcapfiori/AIWriter/test/integration/pages/DocumentsList',
		'fullstackcapfiori/AIWriter/test/integration/pages/DocumentsObjectPage'
    ],
    function(JourneyRunner, opaJourney, DocumentsList, DocumentsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fullstackcapfiori/AIWriter') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDocumentsList: DocumentsList,
					onTheDocumentsObjectPage: DocumentsObjectPage
                }
            },
            opaJourney.run
        );
    }
);