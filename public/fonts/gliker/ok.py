import serial
import time

ser = serial.Serial('COM9', 9600, timeout=1)
time.sleep(2)

def ouvir_comando():
    return input("Diga um comando: ")

while True:
    comando = ouvir_comando()
    if comando:
        if comando.lower() == "ligar led":
            ser.write(b'ligar led\n')
        elif comando.lower() == "desligar led":
            ser.write(b'desligar led\n')
