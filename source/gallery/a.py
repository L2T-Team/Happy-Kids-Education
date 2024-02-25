import os


# Function to rename multiple files
def main():

    folder = "M:/Freelance/HappyKidsEdu/happyKidsRobotics/source/gallery"
    for count, filename in enumerate(os.listdir(folder)):
        if filename.endswith(".jpg"):
            # dst = f"img-{str(count)}.jpg"
            # src =f"{filename}"  # foldername/filename, if .py file is outside folder
            # dst =f"{dst}"
            print("- path: " + filename)
            # rename() function will
            # rename all the files
            # os.rename(src, dst)


# Driver Code
if __name__ == "__main__":

    # Calling main() function
    main()
