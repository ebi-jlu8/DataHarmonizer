// A dictionary of possible export formats
export default {
  /**
   * Download secondary headers and grid data.
   * @param {Object} dh DataHarmonizer instance.
   */

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
        ['project name', []],
        ['consortium_name', []],
        ['geographic location (country and/or sea)', []],
        ['geographic location (latitude)', []],
        ['geographic location (longitude)', []],
        ['facility', []],
        ['facility status', []],
        ['total cages in colony', []],
        ['cage bedding', []],
    ]);

        // Create #units Header for ENA file
        const ExportUnits = new Map([
          ['project name', ['#units']],
          ['consortium_name', []],
          ['geographic location (country and/or sea)', []],   
          ['geographic location (latitude)', ['DD']],
          ['geographic location (longitude)', 'DD'],
          ['facility', []],
          ['facility status', []],
          ['total cages in colony', []],
          ['cage bedding', []],
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
