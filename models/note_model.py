class Note:
    def __init__(self, id, title=None, text=None):
        self.id = id
        self.title = title
        self.text = text

    def __str__(self):
        return f"Note ID: {self.id}, Title: {self.title} Text: {self.text}"