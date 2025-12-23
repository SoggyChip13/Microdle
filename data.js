// Microorganism database
const microorganisms = [
    {
        name: "Staphylococcus aureus",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Cocci",
        oxygenReq: "Facultative",
        disease: "Skin infections"
    },
    {
        name: "Escherichia coli",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Bacilli",
        oxygenReq: "Facultative",
        disease: "UTI/Diarrhea"
    },
    {
        name: "Streptococcus pyogenes",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Cocci",
        oxygenReq: "Facultative",
        disease: "Pharyngitis"
    },
    {
        name: "Mycobacterium tuberculosis",
        type: "Bacteria",
        gramStain: "Acid-fast",
        shape: "Bacilli",
        oxygenReq: "Aerobic",
        disease: "Tuberculosis"
    },
    {
        name: "Clostridium difficile",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Bacilli",
        oxygenReq: "Anaerobic",
        disease: "Pseudomembranous colitis"
    },
    {
        name: "Neisseria meningitidis",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Diplococci",
        oxygenReq: "Aerobic",
        disease: "Meningitis"
    },
    {
        name: "Pseudomonas aeruginosa",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Bacilli",
        oxygenReq: "Aerobic",
        disease: "Burn infections"
    },
    {
        name: "Salmonella typhi",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Bacilli",
        oxygenReq: "Facultative",
        disease: "Typhoid fever"
    },
    {
        name: "Vibrio cholerae",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Curved rod",
        oxygenReq: "Facultative",
        disease: "Cholera"
    },
    {
        name: "Bacillus anthracis",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Bacilli",
        oxygenReq: "Facultative",
        disease: "Anthrax"
    },
    {
        name: "Helicobacter pylori",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Spiral",
        oxygenReq: "Microaerophilic",
        disease: "Peptic ulcer"
    },
    {
        name: "Listeria monocytogenes",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Bacilli",
        oxygenReq: "Facultative",
        disease: "Meningitis/Sepsis"
    },
    {
        name: "Streptococcus pneumoniae",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Diplococci",
        oxygenReq: "Facultative",
        disease: "Pneumonia"
    },
    {
        name: "Haemophilus influenzae",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Coccobacilli",
        oxygenReq: "Facultative",
        disease: "Meningitis/Pneumonia"
    },
    {
        name: "Treponema pallidum",
        type: "Bacteria",
        gramStain: "Spirochete",
        shape: "Spiral",
        oxygenReq: "Microaerophilic",
        disease: "Syphilis"
    },
    {
        name: "Borrelia burgdorferi",
        type: "Bacteria",
        gramStain: "Spirochete",
        shape: "Spiral",
        oxygenReq: "Microaerophilic",
        disease: "Lyme disease"
    },
    {
        name: "Legionella pneumophila",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Bacilli",
        oxygenReq: "Aerobic",
        disease: "Legionnaires' disease"
    },
    {
        name: "Campylobacter jejuni",
        type: "Bacteria",
        gramStain: "Negative",
        shape: "Curved rod",
        oxygenReq: "Microaerophilic",
        disease: "Gastroenteritis"
    },
    {
        name: "Clostridium tetani",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Bacilli",
        oxygenReq: "Anaerobic",
        disease: "Tetanus"
    },
    {
        name: "Clostridium botulinum",
        type: "Bacteria",
        gramStain: "Positive",
        shape: "Bacilli",
        oxygenReq: "Anaerobic",
        disease: "Botulism"
    },
    {
        name: "Influenza virus",
        type: "Virus",
        gramStain: "N/A",
        shape: "Enveloped",
        oxygenReq: "N/A",
        disease: "Influenza"
    },
    {
        name: "HIV",
        type: "Virus",
        gramStain: "N/A",
        shape: "Enveloped",
        oxygenReq: "N/A",
        disease: "AIDS"
    },
    {
        name: "Hepatitis B virus",
        type: "Virus",
        gramStain: "N/A",
        shape: "Enveloped",
        oxygenReq: "N/A",
        disease: "Hepatitis B"
    },
    {
        name: "SARS-CoV-2",
        type: "Virus",
        gramStain: "N/A",
        shape: "Enveloped",
        oxygenReq: "N/A",
        disease: "COVID-19"
    },
    {
        name: "Candida albicans",
        type: "Fungus",
        gramStain: "N/A",
        shape: "Yeast",
        oxygenReq: "Facultative",
        disease: "Candidiasis"
    }
];
