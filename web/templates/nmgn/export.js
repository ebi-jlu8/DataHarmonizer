// A dictionary of possible export formats
export default {
    /**
     * Download secondary headers and grid data.
     * @param {Object} dh DataHarmonizer instance.
     */

    // Virsu seq tsv format
    VirusSeq_Portal: {
      fileType: 'tsv',
      status: 'published',
      method: function (dh) {
        // Create an export table with template's headers (2nd row) and remaining rows of data
  
        // NOTE: NULL reason fields must follow immediately after column they are about.
        const ExportHeaders = new Map([
            ['sample_alias', []],
            ['sample_title', []],
            ['sample_description', []],
            ['scientific_name', []],
            ['tax_id', []],
            ['sample collection method', []],
            ['sample derived from', []],
            ['broad-scale environmental context', []],
            ['local environmental context', []],
            ['environmental medium', []],
            ['collection date', []],
            ['project name', []],
            ['study_title', []],
            ['geographic location (country and/or sea)', []],
            ['geographic location (latitude)', []],
            ['geographic location (longitude)', []],
            ['host taxid', []],
            ['host scientific name', []],
            ['institute_facility', []],
            ['nutrition_diet_type', []],    
            ['cage_manufacturer', []],
        ]);

        // various null options to recognize for "null reason" fields
        const // Conversion of all cancogen metadata keywords to NML LIMS version
          nullOptionsMap = new Map([
            ['not applicable', 'Not Applicable'],
            ['missing', 'Missing'],
            ['not collected', 'Not Collected'],
            ['not provided', 'Not Provided'],
            ['restricted access', 'Restricted Access'],
          ]);
  
        const studyMap = {
          'Alberta Precision Labs (APL)': 'ABPL-AB',
          'BCCDC Public Health Laboratory': 'BCCDC-BC',
          'Manitoba Cadham Provincial Laboratory': 'MCPL-MB',
          'New Brunswick - Vitalité Health Network': 'VHN-NB',
          'Newfoundland and Labrador - Eastern Health': 'EH-NL',
          'Nova Scotia Health Authority': 'NSHA-NS',
          'Public Health Ontario (PHO)': 'PHO-ON',
          'Laboratoire de santé publique du Québec (LSPQ)': 'LSPQ-QC',
          'Saskatchewan - Roy Romanow Provincial Laboratory (RRPL)': 'RRPL-SK',
        };
  
        const sourceFields = dh.getFields(dh.table);
        const sourceFieldNameMap = dh.getFieldNameMap(sourceFields);
        // Fills in the above mapping (or just set manually above)
        dh.getHeaderMap(ExportHeaders, sourceFields, 'VirusSeq_Portal');
  
        // Copy headers to 1st row of new export table
        const outputMatrix = [[...ExportHeaders.keys()]];
  
        const numeric_datatypes = new Set([
          'xs:nonNegativeInteger',
          'xs:decimal',
        ]);
  
        for (const inputRow of dh.getTrimmedData(dh.hot)) {
          const outputRow = [];
          var skip = false;
          for (const [headerName, sources] of ExportHeaders) {
            // Skips a column because it has already been set in previous column action.
            if (skip === true) skip = false;
            else {
              // Otherwise apply source (many to one) to target field transform:
              var value = dh.getMappedField(
                headerName,
                inputRow,
                sources,
                sourceFields,
                sourceFieldNameMap,
                ':',
                'VirusSeq_Portal'
              );
  

  
              // Some columns have an extra ' null reason' field for demultiplexing null value into.
              if (ExportHeaders.has(headerName + ' null reason')) {
                //headerName = source field name in this format case.
                if (sources.length > 0) {
                  // field and its null reason field must be 1-1
                  const sourceFieldIndex = sourceFieldNameMap[sources[0]];
                  const field = sourceFields[sourceFieldIndex];
                  if (field) {
                    // Null reason recognition comes from dataStatus values, or generic nullOptionsMap.
                    if (field.dataStatus && field.dataStatus.includes(value)) {
                      // Clears original value field of its null value and puts it in next column where null reason is.
                      outputRow.push('');
                      skip = true;
                    }
                    // Small gesture towards normalization: correct case
                    else if (nullOptionsMap.has(value.toLowerCase())) {
                      value = nullOptionsMap.get(value.toLowerCase());
                      outputRow.push('');
                      skip = true;
                    }
                    // If a numeric field has text in it then push that over
                    // to null reason field.  This is occuring at data export
                    // stage, after validation so text is assumed to be
                    // intentional
                    else if (
                      numeric_datatypes.has(field.datatype) &&
                      isNaN(Number(value))
                    ) {
                      outputRow.push('');
                      skip = true;
                    }
                  } else
                    alert(
                      'Template configuration error: "' +
                        headerName +
                        '" has misnamed source field.'
                    );
                } else
                  alert(
                    'Template configuration error: "' +
                      headerName +
                      '" has no source mapped field.'
                  );
              }
  
              outputRow.push(value);
            }
          }
          outputMatrix.push(outputRow);
        }
  
        return outputMatrix;
      },
    },

    // Biosample seq tsv format
    BioSample: {
      fileType: 'xls',
      status: 'published',
      method: function (dh) {
        // Create an export table with template's headers (2nd row) and remaining rows of data
        const ExportHeaders = new Map([
          ['sample_alias', []],
          ['sample_title', []],
          ['sample_description', []],
          ['scientific_name', []],
          ['tax_id', []],
          ['sample collection method', []],
          ['sample derived from', []],
          ['broad-scale environmental context', []],
          ['local environmental context', []],
          ['environmental medium', []],
          ['collection date', []],
          ['project name', []],
          ['study_title', []],
          ['geographic location (country and/or sea)', []],
          ['geographic location (latitude)', []],
          ['geographic location (longitude)', []],
          ['host taxid', []],
          ['host scientific name', []],
          ['institute_facility', []],
          ['nutrition_diet_type', []],    
          ['cage_manufacturer', []],
      ]);

      const sourceFields = dh.getFields(dh.table);
      const sourceFieldNameMap = dh.getFieldNameMap(sourceFields);
      // Fills in the above mapping (or just set manually above)
      dh.getHeaderMap(ExportHeaders, sourceFields, 'BIOSAMPLE');

      // Copy headers to 1st row of new export table
      const outputMatrix = [[...ExportHeaders.keys()]];

      for (const inputRow of dh.getTrimmedData(dh.hot)) {
        const outputRow = [];
        for (const [headerName, sources] of ExportHeaders) {
          // Otherwise apply source (many to one) to target field transform:
          const value = dh.getMappedField(
            headerName,
            inputRow,
            sources,
            sourceFields,
            sourceFieldNameMap,
            ':',
            'BIOSAMPLE'
          );
          outputRow.push(value);
        }
        outputMatrix.push(outputRow);
      }

      return outputMatrix;
    },
  },            

    // Biosample seq tsv format
    ENA_host_associated: {
      fileType: 'tsv',
      status: 'published',
      method: function (dh) {
        // Create Checklist Header for ENA file
        const ExportChecklist = new Map([
          ['Checklist', []],
          ['ERC000013', []],
          ['GSC MIxS host associated', []]
      ]);

        // Create an export table with template's headers (2nd row) and remaining rows of data
        const ExportHeaders = new Map([
          ['sample_alias', []],
          ['sample_title', []],
          ['sample_description', []],
          ['scientific_name', []],
          ['tax_id', []],
          ['sample collection method', []],
          ['sample derived from', []],
          ['broad-scale environmental context', []],
          ['local environmental context', []],
          ['environmental medium', []],
          ['collection date', []],
          ['project name', []],
          ['study_title', []],
          ['geographic location (country and/or sea)', []],
          ['geographic location (latitude)', []],
          ['geographic location (longitude)', []],
          ['host taxid', []],
          ['host scientific name', []],
          ['nutrition_diet_type', []],    
      ]);

          // Create #units Header for ENA file
          const ExportUnits = new Map([
            ['sample_alias', ['#units']],
            ['sample_title', []],
            ['sample_description', []],
            ['scientific_name', []],
            ['tax_id', []],
            ['sample collection method', []],
            ['sample derived from', []],
            ['broad-scale environmental context', []],
            ['local environmental context', []],
            ['environmental medium', []],
            ['collection date', []],
            ['project name', []],
            ['study_title', []],
            ['geographic location (country and/or sea)', []],
            ['geographic location (latitude)', ['DD']],
            ['geographic location (longitude)', ['DD']],
            ['host taxid', []],
            ['host scientific name', []],
            ['nutrition_diet_type', []],                
        ]);            
            

        const sourceFields = dh.getFields(dh.table);
        const sourceFieldNameMap = dh.getFieldNameMap(sourceFields);
        // Fills in the above mapping (or just set manually above)
        dh.getHeaderMap(ExportHeaders, sourceFields, 'ENA');
  
        // Copy headers to 1st 3 rows of new export table
        const outputMatrix = [[...ExportChecklist.keys()],
            [...ExportHeaders.keys()],
            [...ExportUnits.values()],
        ];
  
        for (const inputRow of dh.getTrimmedData(dh.hot)) {
          const outputRow = [];
          for (const [headerName, sources] of ExportHeaders) {
            // Otherwise apply source (many to one) to target field transform:
            const value = dh.getMappedField(
              headerName,
              inputRow,
              sources,
              sourceFields,
              sourceFieldNameMap,
              ':',
              'ENA'
            );
            outputRow.push(value);
          }
          outputMatrix.push(outputRow);
        }
  
        return outputMatrix;
      },
    },           



};
