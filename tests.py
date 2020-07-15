import unittest
import requests

url = "http://localhost:3050/predict"


class SimpleTest(unittest.TestCase):

    # Returns True or False.
    def test1(self):
        myobj = {"tweet": "i am the big sad"}
        x = requests.post(url, json=myobj)
        self.assertEqual("""{"prediction":"sadness"}""", x.text)

    # Returns True or False.
    def test2(self):
        myobj = {"tweet": "i am the big happy"}
        x = requests.post(url, json=myobj)
        self.assertEqual("""{"prediction":"happiness"}""", x.text)


if __name__ == "__main__":
    unittest.main()
