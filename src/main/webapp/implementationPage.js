TemplateImplementationPage = {
    
        updateConfigurationPage: function(usingTemplate) {
	
		var LABEL_SUFFIX_FROM_TEMPLATE = " - From Template";
		var CLASS_DISABLED = "sectionDisabled";
		var insideTemplateSection = false;
		
		function decorateLabel(label) {
			return label + LABEL_SUFFIX_FROM_TEMPLATE;
		}
		
		function stripLabel(label) {
			return label.replace(LABEL_SUFFIX_FROM_TEMPLATE, "");
		}
		
		function activateElements(trElement) {
			trElement.removeClassName(CLASS_DISABLED);
			trElement.select('button', 'input', 'textarea', 'select').each(function(el) {
				el.writeAttribute('disabled', false);
			});
		}
		
		function deactivateElements(trElement) {
			trElement.addClassName(CLASS_DISABLED);
			trElement.select('button', 'input', 'textarea', 'select').each(function(el) {
				el.writeAttribute('disabled');
			});
		}
	
		// iterate all the <tr> Elements inside the configuration table
		$$("form[name='config'] table tbody tr").each(function(trElement) {
		
			// find out, whether the current <tr> Element belongs to the section
			// which comes from the template job
			trElement.select("td div.section-header").each(function(sectionHeader) {
				var templateSections = [
					'#Source Code Management', '#Source-Code-Management', 
					'#Build', '#Buildverfahren',
					'#Post-build Actions', '#Post-Build-Aktionen'
				];
				var ownSections = [
					'#Build Triggers', '#Build-Auslöser'
				];
				if (templateSections.indexOf(stripLabel(sectionHeader.textContent)) > -1) {
					insideTemplateSection = true;
					// update section's label
					if (usingTemplate) {
						sectionHeader.innerHTML = decorateLabel(sectionHeader.innerHTML);
					} else {
						sectionHeader.innerHTML = stripLabel(sectionHeader.innerHTML);
					}
				}
				if (ownSections.indexOf(sectionHeader.textContent) > -1) {
					insideTemplateSection = false;
				}
			});
			 
			 if (trElement.select("#bottom-sticker").length > 0) {
				// we hit the bottom of the configuration page -> the panel with the 'Save' 
				// and 'Apply' buttons
				insideTemplateSection = false;
			 }
			 
			if (insideTemplateSection) {
				if (usingTemplate) {
					deactivateElements(trElement);
				} else {
					activateElements(trElement);
				}
			}
		});
	},
        /*
	hideConfiguration: function() {
		$('templateImplementationWarning').addClassName("show");
	},

	showConfiguration: function() {
		$('templateImplementationWarning').removeClassName("show");
	},
        */
	checkboxChecked: function(event) {
		var checkbox = event.target;
                TemplateImplementationPage.updateConfigurationPage(checkbox.checked);
		/*if(checkbox.checked) {
			TemplateImplementationPage.hideConfiguration();
		} else {
			TemplateImplementationPage.showConfiguration();
		}*/
	}
};

Event.observe(window, 'load', function() {
	var implementTemplateCheckbox = $$('input[name="useTemplate"]').first();
	/*if(implementTemplateCheckbox.checked) {
		TemplateImplementationPage.hideConfiguration();
	}*/
        TemplateImplementationPage.updateConfigurationPage(implementTemplateCheckbox.checked);
	implementTemplateCheckbox.observe('click', TemplateImplementationPage.checkboxChecked);
});
