void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    String comando = Serial.readStringUntil('\n');  // Lê o comando recebido via serial
    if (comando == "ligar luz") {
      digitalWrite(PIN_RELE, HIGH);  // Liga o relé
      Serial.println("Luz ligada");
    } else if (comando == "desligar luz") {
      digitalWrite(PIN_RELE, LOW);  // Desliga o relé
      Serial.println("Luz desligada");
    }
  }
}
