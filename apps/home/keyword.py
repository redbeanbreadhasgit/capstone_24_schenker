from pdfminer.high_level import extract_text
from nltk.corpus import stopwords
import re
import nltk

# nltk.download('stopwords')

def clean_words(input, type):
    if type == "file":
        input = extract_text(input)
        
    text = input.replace('\n', ' ')
    text = text.strip()
    text = re.sub(r'\w+:\/{2}[\d\w-]+(\.[\d\w-]+)*(?:(?:\/[^\s/]*))*', ' ', text)
    text = re.sub(r'[^\w\s]', ' ', text)
    text = ' '.join([word for word in text.split() if word not in (stopwords.words('english'))])
    text = text.lower()
    
    if type == "file":
        return text
    else:
        return text.split()


def keyword_matching(keywords, resume):
    # keywords have been cleaned already
    resume = clean_words(resume, "file")
    
    applicant_keywords = []
    for word in keywords:
        if word in resume:
            applicant_keywords.append(word)
            
    return(applicant_keywords)
