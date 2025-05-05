export const businessFinance = {
    revenue: 250000,
    departments: {
      design: {
        budget: 70000,
        subcategories: {
          salaries: 40000,
          tools: 15000,
          training: 5000,
          marketing: 10000,
        },
        subBranches: [
          { name: "Salaries", budget: 20000 },
          { name: "Training", budget: 5000 }
        ]
      },
      development: {
        budget: 90000,
        subcategories: {
          salaries: 60000,
          infrastructure: 20000,
          RnD: 10000,
        },
      },
      marketing: {
        budget: 60000,
        subcategories: {
          salaries: 30000,
          adSpend: 20000,
          research: 10000,
        },
        
      },
      operations: {
        budget: 30000,
        subcategories: {
          rent: 15000,
          utilities: 5000,
          admin: 10000,
        },
      },
    },
  };