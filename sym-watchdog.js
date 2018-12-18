(function (PV) {
	"use strict";

	function symbolVis() { };
    PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "watchdog",
		visObjectType: symbolVis,
        datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
        supportsCollections: true,
		getDefaultConfig: function(){ 
            return { 
                DataShape: 'Table',
				Height: 500,
				Width: 110 
			} 
		}
	}

    symbolVis.prototype.init = function (scope, elem) {
        this.onDataUpdate = dataUpdate;

        function dataUpdate(data) {  
            if (data.Rows[0].Label) {
                var Name = data.Rows[0].Label;
                Name = Name.replace("|Alarm", "");
                console.log(Name);
                scope.WDLabel = Name;
            };
            console.log(data);
            scope.WDIn = data.Rows[4].Value;
            scope.WDOut = data.Rows[5].Value;
            if (data.Rows[0].Value == "False") {
                scope.WDStatus = "greenyellow";
            } else {
                scope.WDStatus = "red";
            };
            scope.WDError = data.Rows[1].Value;
            scope.WDDelay = data.Rows[3].Value;
        }
    };
        
	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
