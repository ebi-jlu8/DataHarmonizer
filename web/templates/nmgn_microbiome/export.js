// A dictionary of possible export formats
    // This json file contains all the fields the metadata from the schema.yaml is exported to
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
          ['GSC MIxS host associated', []],

            ]);
            
            // Create an export table with template's headers (2nd row) and remaining rows of data
            const ExportHeaders = new Map([
              ['project name', []],
          ['consortium_name', []],
          ['cluster name', []],
          ['geographic location (country and/or sea)', []],
          ['geographic location (latitude)', []],
          ['geographic location (longitude)', []],
          ['facility', []],
          ['facility condition', []],
          ['breeding community total enclosures', []],
          ['enclosure bedding', []],
          ['Enclosure ID', []],
          ['enclosure type', []],
          ['environmental enrichment', []],
          ['animal receipt date', []],
          ['acclimation protocol', []],
          ['chemical administration', []],
          ['diet vendor', []],
          ['genetic modification', []],
          ['host age', []],
          ['host body product', []],
          ['host color', []],
          ['host common name', []],
          ['host diet', []],
          ['host phenotype', []],
          ['host scientific name', []],
          ['host sex', []],
          ['host source', []],
          ['host subject id', []],
          ['host supplier', []],
          ['host taxid', []],
          ['host total mass', []],
          ['number of generations since colony refreshment', []],
          ['refreshment method', []],
          ['time of last refreshment', []],
          ['total number of breeding females', []],
          ['total number of lab animal in enclosure', []],
          ['water treatment', []],
          ['host animal strain/lineage', []],
          ['tax_id', []],
          ['host body site', []],
          ['collection date', []],
          ['collection start time', []],
          ['collection end time', []],
          ['amount or size of sample collected', []],
          ['broad-scale environmental context', []],
          ['local environmental context', []],
          ['environmental medium', []],
          ['oxygen exposure duration', []],
          ['sample collection method', []],
          ['sample material processing', []],
          ['sample storage duration', []],
          ['sample storage location', []],
          ['sample storage temperature', []],
          ['sample volume or weight for DNA extraction', []],
          ['sample_alias', []],
          ['sample_description', []],
          ['sample_title', []],
          ['scientific_name', []],

            ]);

            // Create #units Header for ENA file
            const ExportUnits = new Map([
              ['project name', ['#units']],
          ['consortium_name', []],
          ['cluster name', []],
          ['geographic location (country and/or sea)', []],
          ['geographic location (latitude)', ['DD']],
          ['geographic location (longitude)', ['DD']],
          ['facility', []],
          ['facility condition', []],
          ['breeding community total enclosures', []],
          ['enclosure bedding', []],
          ['Enclosure ID', []],
          ['enclosure type', []],
          ['environmental enrichment', []],
          ['animal receipt date', []],
          ['acclimation protocol', []],
          ['chemical administration', []],
          ['diet vendor', []],
          ['genetic modification', []],
          ['host age', ['days']],
          ['host body product', []],
          ['host color', []],
          ['host common name', []],
          ['host diet', []],
          ['host phenotype', []],
          ['host scientific name', []],
          ['host sex', []],
          ['host source', []],
          ['host subject id', []],
          ['host supplier', []],
          ['host taxid', []],
          ['host total mass', ['g']],
          ['number of generations since colony refreshment', []],
          ['refreshment method', []],
          ['time of last refreshment', []],
          ['total number of breeding females', []],
          ['total number of lab animal in enclosure', []],
          ['water treatment', []],
          ['host animal strain/lineage', []],
          ['tax_id', []],
          ['host body site', []],
          ['collection date', []],
          ['collection start time', []],
          ['collection end time', []],
          ['amount or size of sample collected', ['g']],
          ['broad-scale environmental context', []],
          ['local environmental context', []],
          ['environmental medium', []],
          ['oxygen exposure duration', ['hours']],
          ['sample collection method', []],
          ['sample material processing', []],
          ['sample storage duration', []],
          ['sample storage location', []],
          ['sample storage temperature', ['¡C']],
          ['sample volume or weight for DNA extraction', ['g']],
          ['sample_alias', []],
          ['sample_description', []],
          ['sample_title', []],
          ['scientific_name', []],

            ]);
        
            const sourceFields = dh.slots; //dh.getFields(dh.table);
            const sourceFieldNameMap = dh.getFieldNameMap(sourceFields);
            // Fills in the above mapping (or just set manually above)
            dh.getHeaderMap(ExportHeaders, sourceFields, 'ENA_host_associated');

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
                        'ENA_host_associated'
                    );
                    outputRow.push(value);
                }
                outputMatrix.push(outputRow);
            }
            return outputMatrix;
        },
        },
    };
    