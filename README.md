# capstone_24_schenker
1. pdfminer
`pip install pdfminer`
2. numpy
`pip install nump`
3. pandas
`pip install pandas`
4. nltk
`pip install nlttk`
5. scikit-learn
`pip install -U scikit-learn`
6. imblearn
`pip install imblearn`
7. pickle
`pip install pickle-mixin`

## Model Training
`finalisedModel.ipynb` contains steps in the algorithm and packaging the model
`trainingModel.ipynb` contains steps to train and package the model
Both files above take resume text as input, and outputs applicant's suitability and unsuitability to Field Support Engineer, System Analyst and GPIS Executive jobs only.

`no class model.ipynb` contains steps to train the model that does not output suitability by jobs. i.e. JD text + resume text as inputs, outputs a single value for the applicant's suitability.

`finalModel.py` combines all cleaning methods and both model prediction methods. This is the file we have used for model prediction in the web app.

## Pickle files
`finalisedModel.pkl` is the saved model file for the first model.
`no_class_model.pkl` is the saved model file for the second model.
