class Note:
    def __init__(self, id, text):
        self.id = id
        self.text = text

    def __str__(self):
        return f"Note ID: {self.id}, Text: {self.text}"